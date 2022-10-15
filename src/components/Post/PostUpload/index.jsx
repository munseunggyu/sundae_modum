import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../../../common/Header"
import { MainContainer } from "../../../common/MainContainer"
import Nav from "../../../common/Nav"
import { IrH2 } from "../../../common/TextHide"
import fileImg  from '../../../assets/img-file-button.png'
import { useDispatch, useSelector } from "react-redux";
import { setTest } from "../../../redux/actions/user_action";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../firebase";

const TextArea = styled.textarea`
  width:100%;
  border:0;
  outline:none;
  resize:none;
`;
const DeadlineContainer = styled.div`
  width:100%;
  padding:20px 0;
  display: flex;
  justify-content:center;
  align-items:center;
  gap:10px;
`;
const CountInput = styled.input`
  display: block;
  margin:0 auto;
  margin-bottom:20px;
`;
const TitInput = styled.input`
  width:100%;
  border:0;
  border-bottom:1px solid gray;
  outline:none;
  margin-bottom:10px;
  font-size:16px;
`;
const FileBtn = styled.button`
  position:fixed;
  bottom:70px;
  width:50px;
  height:50px;
  right:10px;
  background:url(${fileImg}) center/cover;
`;
const FileInput = styled.input`
  display: none;
`;
const FileContainer = styled.div`
  width:100px;
  height:100px;
  position: relative;
`;
const FileImg = styled.img`
  width:100%;
  height:100%;
`;
const FileCloseBtn = styled.button`
  position: absolute;
  right:0;
  width:20px;
  height:20px;
  background-color:black;
  color:white;
`;
function PostUploadPage(){
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user.currentUser)
  // 보낼 데이터: 게시글, 이미지, 작성자 정보, 마감 기한
  const [postTxt,setPostTxt] = useState('')
  const [postDate,setPostDate] = useState('')
  const [postTime,setPostTime] = useState('')
  const [postTit,setPostTit] = useState('')
  const [postCount,setPostCount] = useState(0)
  const [file, setFile] = useState('')
  const fileRef = useRef()
  const textArearRef = useRef()

  const preview = e => {
    const files = e.target.files;
    const reader = new FileReader() // FileReader Api
    reader.onload = (finish) => {
      setFile(finish.target.result)
    }
    reader.readAsDataURL(files[0])
  }
  const handleFileClose = ()=>{
    setFile('')
  }
  const hadleFileRef = () => {
    fileRef.current.click()
  }
  const handleAutoHeight = () =>{
    // console.log(textArearRef.current.style)
    textArearRef.current.style.height = '70px'
    textArearRef.current.style.height = textArearRef.current.scrollHeight + 'px'
  }
  const handlePostSubmit = async (e) => {
    e.preventDefault()
    console.log(postCount,postTit)
    console.log(postTxt)
    console.log(postDate,postTime)
    const postData = {
      writer:userInfo.uid,
      postDate,
      postTime,
      postCount,
      postTit,
      postTxt
    }
    try{

      const postRef = await addDoc(collection(db,'posts'),postData)
    }catch(error){
      console.log(error)
    }
  }
  return(
    <>
    <Header prv={true} upload={true} onSubmit={handlePostSubmit}/>
      <MainContainer>
        <IrH2>게시물 작성</IrH2>
        <form onSubmit={handlePostSubmit}>
          <DeadlineContainer>
          <input type="date"
          required={true}
          value={postDate}
          onChange={(e) => setPostDate(e.target.value)}
          />
          <input type="time" 
          required={true}
          value={postTime}
          onChange={(e) => setPostTime(e.target.value)}
          /> : 까지 모집
          </DeadlineContainer>
          <CountInput 
          type="number"
          required={true}
          value={postCount}
          onChange={(e) => {
            setPostCount(e.target.value)}}
          placeholder="인원수를 입력해주세요." />
          <TitInput 
          type="text"
          required={true}
          value={postTit}
          onChange={(e) => {
            setPostTit(e.target.value)}}
          placeholder="제목을 입력해 주세요." />
          <TextArea
          ref={textArearRef}
          onInput={handleAutoHeight}
          required={true}
          value={postTxt}
          onChange={(e) => {
            setPostTxt(e.target.value)}}
          placeholder="게시글을 입력해주세요..."
          />
        </form>
        {file && (
          <FileContainer>
            <FileCloseBtn
            onClick={handleFileClose}
            >x</FileCloseBtn>
            <FileImg src={file} alt="" />
          </FileContainer>
        )}
      </MainContainer>
      <FileBtn onClick={hadleFileRef} />
      <FileInput
      onChange={preview}
      ref={fileRef} type="file" />
    <Nav />
    </>
  )
}

export default PostUploadPage