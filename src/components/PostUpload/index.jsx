import { useCallback, useRef, useState } from "react";
import styled from "styled-components";
import Header from "../../common/Header"
import { MainContainer } from "../../common/MainContainer"
import Nav from "../../common/Nav"
import { IrH2 } from "../../common/TextHide"
import fileImg  from '../../assets/img-file-button.png'

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
  // 보낼 데이터: 게시글, 이미지, 작성자 정보, 마감 기한
  const [postTxt,setPostTxt] = useState('')
  const [postDate,setPostDate] = useState('')
  const [postTime,setPostTime] = useState('')
  const [file, setFile] = useState('')
  const textArearRef = useRef()
  const fileRef = useRef()
  const handlePostSubmit = (e) => {
    console.log(postTxt)
    console.log(postDate,postTime)
    setPostTxt('')
  }
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
  return(
    <>
    <Header prv={true} upload={true} handleUpload={handlePostSubmit}/>
      <MainContainer>
        <IrH2>게시물 작성</IrH2>
        <form onSubmit={handlePostSubmit}>
          <DeadlineContainer>
          기한: <input type="date"
          onChange={(e) => setPostDate(e.target.value)}
          />
          <input type="time" 
          onChange={(e) => setPostTime(e.target.value)}
          />
          </DeadlineContainer>
          <TitInput type="text" placeholder="제목을 입력해 주세요." />
          <TextArea
          autoFocus={true}
          ref={textArearRef}
          onInput={handleAutoHeight}
          onChange={(e) => {
            setPostTxt(e.target.value)}}
          value={postTxt}
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