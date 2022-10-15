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
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate()
  const [nickName,setNickName] = useState(userInfo.displayName)
  const [introduce,setIntroduce] = useState(userInfo.introduce)
  const [dbFile,setDbFile] = useState(userInfo.photoURL)
  const [prevFile, setPrevFile] = useState(userInfo.photoURL)
  const [metadata,setMetadata] = useState({})
  const fileRef = useRef()

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
  const onSubmit = async (e) => {
    e.preventDefault()
    
    try{
      // 만약 프로필 사진을 업데이트 하면 실행
      if(prevFile !== userInfo.photoURL){
        let uploadTask = uploadBytesResumable(ref(storage, `user_image/${userInfo.uid}`), dbFile,metadata) // user_image/${userInfo.uid} 저장한 파일의 경로이다.
        uploadTask.on('state_changed',
        async () => {
          await getDownloadURL(uploadTask.snapshot.ref).then( async downloadURL=> {
            updateProfile(auth.currentUser,{
              displayName:nickName,
              photoURL:downloadURL,
            })
            const userProfile = doc(db, "users", userInfo.uid);
            await updateDoc(userProfile, {
              displayName:nickName,
              photoURL:downloadURL,
              introduce
            });
          })
        navigate('/profile')
        })
      }
      else{
        // 프로필 사진을 업데이트 하지 않으면 실행
        updateProfile(auth.currentUser,{
          displayName:nickName,
        })
        const userProfile = doc(db, "users", userInfo.uid);
        
        await updateDoc(userProfile, {
          displayName:nickName,
          introduce
        });
        navigate('/profile')
      }
    }catch(error){
      console.log(error)
    }
  }
  return(
    <>
    <Header prv={true} upload={true} onSubmit={onSubmit} />
    <MainContainer>
      <EditFormConatiner onSubmit={onSubmit}>
        <UserProfilImgContainer onClick={hadleFileRef}>
        <UserProfileImg src={prevFile || userImg} alt='' />
        <FileIcon  />
        </UserProfilImgContainer>
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
        placeholder={ userInfo.introduce || "자신을 소개해주세요."}
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