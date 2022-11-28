import Header from '../../common/Header';
import { MainContainer } from '../../common/MainContainer';
import userImg from '../../assets/user-profile.png';
import { useRef, useState } from 'react';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../firebase';
import { useSelector } from 'react-redux';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
  EditFormConatiner,
  EditInput,
  EditLabel,
  FileIcon,
  FileInput,
  UserProfileImg,
  UserProfilImgContainer,
} from './style';

function EditProfile() {
  const userInfo = useSelector((state) => state.user.currentUser);
  const navigate = useNavigate();
  const [nickName, setNickName] = useState(userInfo.displayName);
  const [introduce, setIntroduce] = useState(userInfo.introduce);
  const [dbFile, setDbFile] = useState(userInfo.photoURL);
  const [prevFile, setPrevFile] = useState(userInfo.photoURL);
  const [metadata, setMetadata] = useState({});
  const fileRef = useRef();
  // 사진 프리뷰 함수 FileReader api 이용
  const preview = (e) => {
    const files = e.target.files;
    const reader = new FileReader();
    reader.onload = (finish) => {
      setPrevFile(finish.target.result);
    };
    reader.readAsDataURL(files[0]);
    setDbFile(files[0]);
    setMetadata({ contentType: files[0].type });
  };
  const hadleFileRef = () => {
    fileRef.current.click();
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      // 만약 프로필 사진을 업데이트 하면 실행
      if (prevFile !== userInfo.photoURL) {
        const storageRef = ref(storage, `user_image/${userInfo.uid}`);
        const uploadTask = await uploadBytes(storageRef, dbFile, metadata);
        getDownloadURL(storageRef).then((downloadURL) => {
          const userData = {
            displayName: nickName,
            photoURL: downloadURL,
            uid: userInfo.uid,
            email: userInfo.email,
            introduce: introduce || '',
          };
          updateProfile(auth.currentUser, {
            displayName: nickName,
            photoURL: downloadURL,
          });
          setDoc(doc(db, 'users', userInfo.uid), userData);
        });
      } else {
        const userData = {
          displayName: nickName,
          photoURL: userInfo.photoURL,
          uid: userInfo.uid,
          email: userInfo.email,
          introduce: introduce || '',
        };
        console.log(userData);
        // 프로필 사진을 업데이트 하지 않으면 실행
        updateProfile(auth.currentUser, {
          displayName: nickName,
        });
        await setDoc(doc(db, 'users', userInfo.uid), userData);
      }
    } catch (error) {
      console.log(error);
    }
    navigate('/profile');
  };

  return (
    <>
      <Header
        ir="프로필 편집 페이지"
        prv={true}
        upload={true}
        onSubmit={onSubmit}
      />
      <MainContainer>
        <EditFormConatiner onSubmit={onSubmit}>
          <UserProfilImgContainer onClick={hadleFileRef}>
            <UserProfileImg src={prevFile || userImg} alt="" />
            <FileIcon />
          </UserProfilImgContainer>
          <EditLabel htmlFor="user-nickname">사용자 이름</EditLabel>
          <EditInput
            type="text"
            id="user-nickname"
            placeholder={userInfo.displayName || '닉네임을 설정해주세요.'}
            minLength={2}
            maxLength={10}
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
          />
          <EditLabel htmlFor="user-introduce">소개</EditLabel>
          <EditInput
            type="text"
            id="user-introduce"
            placeholder={userInfo.introduce || '자신을 소개해주세요.'}
            value={introduce}
            onChange={(e) => setIntroduce(e.target.value)}
          />
          <FileInput onChange={preview} ref={fileRef} type="file" />
        </EditFormConatiner>
      </MainContainer>
    </>
  );
}

export default EditProfile;
