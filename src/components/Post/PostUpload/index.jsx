import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../../../common/Header"
import { MainContainer } from "../../../common/MainContainer"
import Nav from "../../../common/Nav"
import { IrH2 } from "../../../common/TextHide"
import fileImg  from '../../../assets/img-file-button.png'
import { useDispatch, useSelector } from "react-redux";
import { setTest } from "../../../redux/actions/user_action";
import { addDoc, collection, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db, storage } from "../../../firebase";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user.currentUser)
  // 보낼 데이터: 게시글, 이미지, 작성자 정보, 마감 기한
  const [postTxt,setPostTxt] = useState('')
  const [postDate,setPostDate] = useState('') 
  const [postTime,setPostTime] = useState('') 
  const [postTit,setPostTit] = useState('')
  const [recruit,setRecruit] = useState(0)
  const [prevFile, setPrevFile] = useState('')
  const [dbFile,setDbFile] = useState(null)
  const [metadata,setMetadata] = useState({})
  const fileRef = useRef()
  const textArearRef = useRef()

  const preview = e => {
    const files = e.target.files;
    const reader = new FileReader() // FileReader Api
    reader.onload = (finish) => {
      setPrevFile(finish.target.result)
    }
    reader.readAsDataURL(files[0])
    setDbFile(files[0])
    setMetadata({contentType:files[0].type})
  }
  const handleFileClose = ()=>{
    setPrevFile('')
    setDbFile(null)
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
    try{
      const postRef = doc(collection(db,'posts'))
      // 이미지 파일이 있으면 실행
      if(dbFile){
        const storageRef = ref(storage,`posts_images/${postRef.id}`)
        const uploadTask = uploadBytes(storageRef, dbFile,metadata)
        .then(() => {
          getDownloadURL(storageRef)
          .then( async downloadURL => {
            const postData = {
              writer:{
                ...userInfo
              },
              postDate:postDate.slice(5).replace('-','/'),
              postTime,
              postTit,
              party: {
                recruit,
                participants:[],
                participateCount:0
              },
              postTxt,
              postImg:downloadURL,
              postkey:postRef.id,
              CreateAt:serverTimestamp(),
            }
            await setDoc(postRef,postData)
          })
        })
      }else{
        const postData = {
          writer:{
            displayName:userInfo.displayName,
            photoURL:userInfo.photoURL
          },
          uid:userInfo.uid,
          postDate:postDate.slice(5).replace('-','/'),
          postTime,
          party: {
            recruit,
            participants:[],
            participateCount:0
          },
          postTit,
          postTxt,
          postkey:postRef.id,
          postImg:null,
          CreateAt:serverTimestamp(),
        }
        await setDoc(postRef,postData)
      }
      navigate('/')
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
          value={postDate}
          onChange={(e) => setPostDate(e.target.value)}
          required
          />
          <input type="time" 
          value={postTime}
          onChange={(e) => setPostTime(e.target.value)}
          required
          /> : 까지 모집
          </DeadlineContainer>
          <CountInput 
          type="number"
          value={recruit}
          onChange={(e) => {
            setRecruit(e.target.value)}}
          placeholder="인원수를 입력해주세요." 
          required
          />
          <TitInput 
          type="text"
          value={postTit}
          onChange={(e) => {
            setPostTit(e.target.value)}}
          placeholder="제목을 입력해 주세요." 
          required
            />
          <TextArea
          ref={textArearRef}
          onInput={handleAutoHeight}
          value={postTxt}
          onChange={(e) => {
            setPostTxt(e.target.value)}}
          placeholder="게시글을 입력해주세요..."
          required
          />
        </form>
        {prevFile && (
          <FileContainer>
            <FileCloseBtn
            onClick={handleFileClose}
            >x</FileCloseBtn>
            <FileImg src={prevFile} alt="" />
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