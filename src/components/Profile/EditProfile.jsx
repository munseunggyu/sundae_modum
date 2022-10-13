import Header from "../../common/Header"
import { MainContainer } from "../../common/MainContainer"
import userImg from '../../assets/user-profile.png'
import fileImg from '../../assets/img-file-button.png'
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { getStorage, uploadBytesResumable,ref, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "firebase/auth";
import { setPhotoURL } from "../../redux/actions/user_action";
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
  const userInfo = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  const [nickName,setNickName] = useState('')
  const [introduce,setIntroduce] = useState('')
  const [prevFile, setPrevFile] = useState(userImg)
  const [dbFile,setDbFile] = useState({})
  const [metadata,setMetadata] = useState({})
  const fileRef = useRef()
  const [users,setUsers] = useState([])

console.log(userInfo,'hi')
  const preview = e => {
    const files = e.target.files;
    const reader = new FileReader() 
    reader.onload = (finish) => {
      setPrevFile(finish.target.result)
    }
    reader.readAsDataURL(files[0])
    setDbFile(files[0])
    setMetadata({contentType:files[0].type})
  }
  const hadleFileRef = () => {
    fileRef.current.click()
  }
  const onSubmit = async (e) => {
    e.preventDefault()

    try{
    updateProfile(auth.currentUser,{
      displayName:nickName,
    })

    const userProfile = doc(db, "users", userInfo.uid);

    await updateDoc(userProfile, {
      displayName:nickName,
      introduce
    });
    setIntroduce('')
    setNickName('')
    }catch(error){
      console.log(error)
    }
  }


  console.log(users)
  return(
    <>
    <Header prv={true} upload={true} onSubmit={onSubmit} />
    <MainContainer>
      <EditFormConatiner onSubmit={onSubmit}>
        <userProfile onClick={hadleFileRef}>
        <UserProfileImg src={prevFile} alt='' />
        <FileIcon  />
        </userProfile>
        <EditLabel htmlFor='user-nickname'>사용자 이름</EditLabel>
        <EditInput 
        type="text" 
        id='user-nickname' 
        placeholder={userInfo.displayName}
        minLength={2}
        maxLength={10}
        value={nickName}
        onChange={(e) => setNickName(e.target.value)}
        />
        <EditLabel htmlFor='user-introduce'>소개</EditLabel>
        <EditInput 
        type="text" 
        id="user-introduce" 
        placeholder="자신을 소개해주세요."
        value={introduce}
        onChange={(e) => setIntroduce(e.target.value)}
        />
        <FileInput
        onChange={preview}
        ref={fileRef} type="file" 
        
        />
      </EditFormConatiner>
    </MainContainer>
    </>
  )
}

export default EditProfile