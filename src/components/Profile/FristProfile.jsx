import Header from "../../common/Header"
import { MainContainer } from "../../common/MainContainer"
import userImg from '../../assets/user-profile.png'
import fileImg from '../../assets/img-file-button.png'
import styled from "styled-components";
import {  useEffect, useRef, useState } from "react";
import { doc, setDoc } from "firebase/firestore"
import {  auth, db, storage } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { ErrorMessageP } from "../Register";

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

function FirstProfilePage(){
  const userInfo = useSelector(state => state.user.currentUser)
  const {register,watch,formState:{errors},handleSubmit} = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [introduce,setIntroduce] = useState('')
  const [prevFile, setPrevFile] = useState(userInfo.photoURL)
  const [dbFile,setDbFile] = useState({})
  const [metadata,setMetadata] = useState({})
  const fileRef = useRef()
  const [users,setUsers] = useState([])

  // 사진 프리뷰 함수 FileReader api 이용
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
  const onSubmit = async ({userName,introduce}) => {
    try{
      // 프로필 사진을 변경 했을때 실행
      if(prevFile !== userInfo.photoURL){
        const storageRef = ref(storage,`user_image/${userInfo.uid}`)
        const uploadTask = await uploadBytes(storageRef,dbFile,metadata)
        getDownloadURL(storageRef)
        .then(downloadURL => {
          const userData = {
            displayName: userName,
            photoURL:downloadURL,
            uid: userInfo.uid,
            email:userInfo.email,
            introduce
          }
          updateProfile(auth.currentUser,{
            displayName:userName,
            photoURL:downloadURL,
          })
        setDoc(doc(db, "users",userInfo.uid), userData)
        })
    }
    // 프로필 사진을 변경 안 했을때
    else{
      const userData = {
        displayName: userName,
        photoURL:userInfo.photoURL,
        uid: userInfo.uid,
        email:userInfo.email,
        introduce
      }
      updateProfile(auth.currentUser,{
        displayName:userName,
      })
      await setDoc(doc(db, "users",userInfo.uid), userData)
      // 설정한 프로필로 friestore에 저장
    }
    }catch(error){
      console.log(error) 
    }
    navigate('/')
  }

  return(
    <>
    <Header prv={true} upload={true} onSubmit={handleSubmit(onSubmit)} />
    <MainContainer>
      <EditFormConatiner onSubmit={handleSubmit(onSubmit)}>
        <UserProfilImgContainer onClick={hadleFileRef}>
        <UserProfileImg src={prevFile || userImg} alt='' />
        <FileIcon  />
        </UserProfilImgContainer>
        <EditLabel 
        htmlFor='user-nickname'
        >사용자 이름</EditLabel>
        <EditInput 
        type="text" 
        id='user-nickname' 
        placeholder='2~10자 이내여야 합니다.'
        name='userNicName'
        {...register("userName", { required: true,minLength:2,maxLength:10 })}
        />
        {errors.userName && <ErrorMessageP> 2~10자 이내여야 합니다.</ErrorMessageP>}
        <EditLabel htmlFor='user-introduce'>소개</EditLabel>
        <EditInput 
        type="text" 
        id="user-introduce" 
        placeholder={"자신을 소개해주세요."}
        name='introduce'
        {...register("introduce", { required: true,minLength:2,maxLength:10 })}
        />
        {errors.introduce && <ErrorMessageP>자신을 소개해주세요.</ErrorMessageP>}
        <FileInput
        onChange={preview}
        ref={fileRef} type="file" 
        
        />
      </EditFormConatiner>
    </MainContainer>
    </>
  )
}

export default FirstProfilePage