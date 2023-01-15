import Header from "../../components/Header";
import { MainContainer } from "../../components/MainContainer";
import userImg from "../../assets/user-profile.png";
import React, { useContext, useRef, useState } from "react";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import { updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import PrevBtn from "../../components/Header/PrevBtn";
import HeaderUploadBtn from "../../components/Header/HeaderUploadBtn";
import { AuthContext } from "../../context/AuthContext";
import { usePreview } from "../../hooks/usePreview";
interface IEditPage {
  isFirst: boolean;
}
interface ICurrentUser {
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
  introduce?: string;
  uid?: string;
}
function EditProfile({ isFirst }: IEditPage) {
  const { state } = useContext(AuthContext);
  const navigate = useNavigate();
  const [nickName, setNickName] = useState(state.currentUser?.displayName);
  const [introduce, setIntroduce] = useState(state.currentUser?.introduce);
  const { dbFile, prevFile, metadata, preview } = usePreview(true);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const hadleFileRef = () => {
    if (!fileRef.current) return;
    fileRef.current.click();
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (nickName === null) {
        alert("닉네임을 설정해주세요");
        return;
      }
      if (!auth.currentUser) return;
      if (!state.currentUser) return;

      let userData: ICurrentUser = {
        displayName: nickName,
        photoURL: undefined,
        uid: state.currentUser?.uid,
        email: state.currentUser?.email,
        introduce: introduce || "",
      };
      console.log(userData);

      if (prevFile !== state.currentUser?.photoURL) {
        // 만약 프로필 사진을 업데이트 하면 실행
        const storageRef = ref(storage, `user_image/${state.currentUser?.uid}`);
        const uploadTask = await uploadBytes(storageRef, dbFile, metadata);

        getDownloadURL(storageRef).then((downloadURL) => {
          if (!auth.currentUser) return;
          if (!state.currentUser) return;
          userData = { ...userData, photoURL: downloadURL };
          updateProfile(auth.currentUser, {
            displayName: nickName,
            photoURL: downloadURL,
          });
          setDoc(doc(db, "users", state.currentUser?.uid), userData);
        });
      } else {
        userData = { ...userData, photoURL: state.currentUser?.photoURL };
        updateProfile(auth.currentUser, {
          displayName: nickName,
        });
        await setDoc(doc(db, "users", state.currentUser?.uid), userData);
      }
    } catch (error) {
      console.log(error);
    }
    isFirst ? navigate("/") : navigate("/profile");
  };

  return (
    <>
      <Header ir="프로필 편집 페이지">
        <PrevBtn />
        <HeaderUploadBtn onSubmit={onSubmit} />
      </Header>
      <MainContainer>
        <S.EditFormConatiner onSubmit={onSubmit}>
          <S.UserProfilImgContainer onClick={hadleFileRef}>
            <S.UserProfileImg src={prevFile || userImg} alt="" />
            <S.FileIcon />
          </S.UserProfilImgContainer>
          <S.EditLabel htmlFor="user-nickname">사용자 이름</S.EditLabel>
          <S.EditInput
            type="text"
            id="user-nickname"
            placeholder={nickName || "닉네임을 설정해주세요."}
            minLength={2}
            maxLength={10}
            onChange={(e) => setNickName(e.target.value)}
          />
          <S.EditLabel htmlFor="user-introduce">소개</S.EditLabel>
          <S.EditInput
            type="text"
            id="user-introduce"
            placeholder={introduce || "자신을 소개해주세요."}
            value={introduce}
            onChange={(e) => setIntroduce(e.target.value)}
          />
          <S.FileInput onChange={preview} ref={fileRef} type="file" />
        </S.EditFormConatiner>
      </MainContainer>
    </>
  );
}

export default EditProfile;
