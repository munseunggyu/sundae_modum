import Header from "../../common/Header"
import { MainContainer } from "../../common/MainContainer"
import userImg from '../../assets/user-profile.png'
import fileImg from '../../assets/img-file-button.png'
import styled from "styled-components";
import { useRef, useState } from "react";

const UserProfileImg = styled.img`
  width:110px;
  height:110px;
  border-radius:50%;
`;
const EditFormConatiner = styled.form`
  display: flex;
  flex-direction:column;
  align-items:center;
  margin-top:20px;
  padding:20px;
`;
const UserProfilImgContainer = styled.div`
  position: relative;
`;
const FileIcon = styled.div`
  position:absolute;
  bottom:0;
  width:50px;
  height:50px;
  right:-20px;
  background:url(${fileImg}) center/cover;
`;
const FileInput = styled.input`
  display: none;
`;
const EditLabel = styled.label`
  align-self:flex-start;
  margin-top:20px;
  font-weight:500;
  color:#767676;
  margin-bottom:10px;
`;
const EditInput = styled.input`
  border:0;
  border-bottom:1px solid #dbdbdb;
  width:100%;
  outline:none;
`;

function EditProfile(){
  const [nickName,setNickName] = useState('')
  const [introduce,setIntroduce] = useState('')
  const [file, setFile] = useState(userImg)
  const fileRef = useRef()

  const preview = e => {
    const files = e.target.files;
    const reader = new FileReader() 
    reader.onload = (finish) => {
      setFile(finish.target.result)
    }
    reader.readAsDataURL(files[0])
  }
  const hadleFileRef = () => {
    fileRef.current.click()
  }

  return(
    <>
    <Header prv={true} upload={true} />
    <MainContainer>
      <EditFormConatiner>
        <UserProfilImgContainer onClick={hadleFileRef}>
        <UserProfileImg src={file} alt='' />
        <FileIcon  />
        </UserProfilImgContainer>
        <EditLabel for='user-nickname'>사용자 이름</EditLabel>
        <EditInput type="text" id='user-nickname' placeholder="닉네임을 입력해주세요."/>
        <EditLabel for='user-introduce'>소개</EditLabel>
        <EditInput type="text" id="user-introduce" placeholder="자신을 소개해주세요."/>
        <FileInput
        onChange={preview}
        ref={fileRef} type="file" />
      </EditFormConatiner>
    </MainContainer>
    </>
  )
}

export default EditProfile