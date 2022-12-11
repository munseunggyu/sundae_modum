import { useRef, useState } from "react";
import Header from "../../../components/Header";
import { MainContainer } from "../../../components/MainContainer";
import Nav from "../../../components/Nav";
import { useDispatch, useSelector } from "react-redux";
import { collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import {
  DeadlineContainer,
  FileBtn,
  FileCloseBtn,
  FileContainer,
  FileImg,
  FileInput,
  TextArea,
  TitInput,
} from "./style";
import DropDown from "../../../components/DropDown";

function PostUploadPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.currentUser);
  // 보낼 데이터: 게시글, 이미지, 작성자 정보, 마감 기한
  const [postTxt, setPostTxt] = useState("");
  const [postDate, setPostDate] = useState("");
  const [postTime, setPostTime] = useState("");
  const [postTit, setPostTit] = useState("");
  const [prevFile, setPrevFile] = useState("");
  const [dbFile, setDbFile] = useState(null);
  const [metadata, setMetadata] = useState({});
  const [chooseCategory, setChooseCategory] = useState("카테고리");
  const fileRef = useRef();
  const textArearRef = useRef();
  const preview = (e) => {
    const files = e.target.files;
    const reader = new FileReader(); // FileReader Api
    reader.onload = (finish) => {
      setPrevFile(finish.target.result);
    };
    reader.readAsDataURL(files[0]);
    setDbFile(files[0]);
    setMetadata({ contentType: files[0].type });
  };
  const handleFileClose = () => {
    setPrevFile("");
    setDbFile(null);
  };
  const hadleFileRef = () => {
    fileRef.current.click();
  };
  const handleAutoHeight = () => {
    textArearRef.current.style.height = "70px";
    textArearRef.current.style.height =
      textArearRef.current.scrollHeight + "px";
  };
  const errorAlert = (data, errorMessage) => {
    if (!data) {
      alert(errorMessage);
      return;
    }
  };
  const handlePostSubmit = async (e) => {
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
        writerId: userInfo.uid,
        postDate: postDate.slice(5).replace("-", "/"),
        postTime,
        party: {
          participants: [],
          participateCount: 0,
        },
        postTit,
        postTxt,
        postkey: postRef.id,
        postImg: null,
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
      <Header
        ir="게시물 작성 페이지"
        prv={true}
        upload={true}
        onSubmit={handlePostSubmit}
      />
      <MainContainer>
        <h2 className="ir">게시물 작성</h2>
        <form onSubmit={handlePostSubmit}>
          <DeadlineContainer>
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
          </DeadlineContainer>
          <DropDown
            chooseCategory={chooseCategory}
            setChooseCategory={setChooseCategory}
          />
          <TitInput
            type="text"
            value={postTit}
            onChange={(e) => {
              setPostTit(e.target.value);
            }}
            maxLength={20}
            placeholder="제목을 입력해 주세요."
          />

          <TextArea
            ref={textArearRef}
            onInput={handleAutoHeight}
            value={postTxt}
            // style="ime-mode:auto"
            onChange={(e) => {
              setPostTxt(e.target.value);
            }}
            placeholder="게시글을 입력해주세요..."
          />
        </form>
        {prevFile && (
          <FileContainer>
            <FileCloseBtn onClick={handleFileClose}>x</FileCloseBtn>
            <FileImg src={prevFile} alt="" />
          </FileContainer>
        )}
      </MainContainer>
      <FileBtn onClick={hadleFileRef} />
      <FileInput onChange={preview} ref={fileRef} type="file" />
      <Nav />
    </>
  );
}

export default PostUploadPage;
