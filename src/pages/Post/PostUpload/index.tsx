import React, { useRef, useState } from "react";
import Header from "../../../components/Header";
import { MainContainer } from "../../../components/MainContainer";
import Nav from "../../../components/Nav";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import * as S from "./style";
import DropDown from "../../../components/DropDown";
import PrevBtn from "../../../components/Header/PrevBtn";
import HeaderUploadBtn from "../../../components/Header/HeaderUploadBtn";
import { usePreview } from "../../../hooks/usePreview";
import { useAuthContext } from "../../../hooks/useAuthContext";

function PostUploadPage() {
  const navigate = useNavigate();
  const { state } = useAuthContext();
  const [postTxt, setPostTxt] = useState("");
  const [postDate, setPostDate] = useState("");
  const [postTime, setPostTime] = useState("");
  const [postTit, setPostTit] = useState("");
  const [chooseCategory, setChooseCategory] = useState("카테고리");
  const { dbFile, prevFile, metadata, setPrevFile, preview, setDbFile } =
    usePreview(false);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const textArearRef = useRef<HTMLTextAreaElement | null>(null);

  const handleFileClose = () => {
    setPrevFile("");
    setDbFile(null);
  };
  const hadleFileRef = () => {
    if (!fileRef?.current) return;
    fileRef.current.click();
  };
  const handleAutoHeight = () => {
    if (!textArearRef.current) return;
    textArearRef.current.style.height = "70px";
    textArearRef.current.style.height =
      textArearRef.current.scrollHeight + "px";
  };
  const errorAlert = (data: any, errorMessage: any) => {
    if (!data) {
      alert(errorMessage);
      return;
    }
  };
  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !postDate ||
      !postTime ||
      !postTit ||
      !postTxt ||
      chooseCategory === "카테고리"
    ) {
      if (!postDate) errorAlert(postDate, "날짜를 선택해주세요.");
      if (!postTime) errorAlert(postTime, "시간을 선택해주세요.");
      else if (chooseCategory === "카테고리") alert("카테고리를 선택해주세요.");
      else if (!postTit) errorAlert(postTit, "제목을 입력해주세요.");
      else if (!postTxt) errorAlert(postTxt, "게시글 내용을 입력해주세요.");
      return;
    }
    try {
      const postRef = doc(collection(db, "posts"));
      let postData = {
        writerId: state.currentUser?.uid,
        postDate: postDate.slice(5).replace("-", "/"),
        postTime,
        party: {
          participants: [],
          participateCount: 0,
        },
        postTit,
        postTxt,
        postkey: postRef.id,
        postImg: "",
        CreateAt: serverTimestamp(),
        category: chooseCategory,
      };
      // 이미지 파일이 있으면 실행
      if (dbFile) {
        const postStorageRef = ref(storage, `posts_images/${postRef.id}`);
        uploadBytes(postStorageRef, dbFile, metadata).then(() => {
          getDownloadURL(postStorageRef).then(async (downloadURL) => {
            postData = { ...postData, postImg: downloadURL };
            await setDoc(postRef, postData);
          });
        });
      } else {
        await setDoc(postRef, postData);
      }
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Header ir="게시물 작성 페이지">
        <PrevBtn />
        <HeaderUploadBtn onSubmit={handlePostSubmit} />
      </Header>
      <MainContainer>
        <h2 className="ir">게시물 작성</h2>
        <form onSubmit={handlePostSubmit}>
          <S.DeadlineContainer>
            <input
              type="date"
              value={postDate}
              onChange={(e) => setPostDate(e.target.value)}
            />
            <input
              type="time"
              value={postTime}
              onChange={(e) => setPostTime(e.target.value)}
            />{" "}
            : 까지 모집
          </S.DeadlineContainer>
          <DropDown
            chooseCategory={chooseCategory}
            setChooseCategory={setChooseCategory}
          />
          <S.TitInput
            type="text"
            value={postTit}
            onChange={(e) => {
              setPostTit(e.target.value);
            }}
            maxLength={20}
            placeholder="제목을 입력해 주세요."
          />

          <S.TextArea
            ref={textArearRef}
            onInput={handleAutoHeight}
            value={postTxt}
            onChange={(e) => {
              setPostTxt(e.target.value);
            }}
            placeholder="게시글을 입력해주세요..."
          />
        </form>
        {prevFile && (
          <S.FileContainer>
            <S.FileCloseBtn onClick={handleFileClose}>x</S.FileCloseBtn>
            <S.FileImg src={prevFile} alt="" />
          </S.FileContainer>
        )}
      </MainContainer>
      <S.FileBtn onClick={hadleFileRef} />
      <S.FileInput onChange={preview} ref={fileRef} type="file" />
      <Nav />
    </>
  );
}

export default PostUploadPage;
