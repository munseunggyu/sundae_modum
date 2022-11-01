import styled from "styled-components";
import Header from "../../../common/Header"
import { MainContainer } from "../../../common/MainContainer"
import arrow from '../../../assets/arrow-left.png'
import DMChatting from "./DMChatting";
import React, { useEffect, useState } from "react";
import { addDoc, collection, collectionGroup, doc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { useSelector } from "react-redux";
const DMDetailContainer = styled.ul`
  width:100%;
  background-color:#f2f2f2;
  min-height:calc(100vh - 96px);
  display: flex;
  flex-direction:column;
  justify-content:flex-end;
  padding:16px;

`;
const ChattingFormContainer = styled.div`
  display: flex;
  justify-content:center;
`;
const ChattingForm = styled.form`
  position: fixed;
  bottom:0;
  max-width:450px;  
  width:100%;
`;
const ChattingInput = styled.input`
  outline:none;
  width:100%;
  font-size:16px;
  padding:15px 30px 15px 15px;
  border:0;
  border-top:0.5px solid #DBDBDB;
`;

const ChattingSubmitBtn = styled.button`
  position: absolute;
  right:10px;
  background:url(${arrow});
  transform:rotateY(180deg);
  width:22px;
  height:22px;
  top:15px;
`;

function DMDetailPage(){
  const userInfo = useSelector(state => state.user.currentUser)
  const [currentDMROOM, setCurrentDMRROOM] = useState([])
  const [chat,setChat] = useState('')
  const [otherUserName,setOtherUserName] = useState('')
  const [otherUserPhotoURL,setOtherUserPhotoURL] = useState('')
  const [chats,setChats] = useState([])
  // 메시지 보내기
  const submitChat = async (e) => {
    e.preventDefault()
    const DMMessage = collection(db, 'DMMessage');
      const newId = collection(DMMessage, currentDMROOM.roomId, 'DM')
      await Promise.all([
          addDoc(newId, {
              chat,
              id:currentDMROOM.roomId,
              CreateAt:serverTimestamp(),
              writerId:userInfo.uid,
            })
      ])
      // 마지막 채팅 
      // 데이터는 시간, 채팅내용, 방아이디, 
      await setDoc(doc(db, "lastMessage", currentDMROOM.roomId), {
        CreateAt: serverTimestamp(),
        id:currentDMROOM.roomId,
        chat
      })
      setChat('')
      console.log('완료')
  }
  // DM 메시지 가져오기
  const getMessages = (id) => {
    const q = query(collectionGroup (db, 'DM'), where('id', '==', id),orderBy('CreateAt','asc'))
    onSnapshot(q,querySnapshot => {
      const newarr = querySnapshot.docs.map(doc => {
        return doc.data({ serverTimestamps: "estimate" })
      })
      setChats(newarr)
    })
    
  }

  // 현재 DM방 id 가져오기
  const getCurrentDMROOM = () => {
    const currentDMRef = doc(db,'current_dm',userInfo.uid)
    const currentDMSnap =  onSnapshot(currentDMRef,currentDMDoc => {
      onSnapshot(doc(db, "users", currentDMDoc.data().otherUserId), (doc) => {
        setOtherUserName(doc.data().displayName)
        setOtherUserPhotoURL(doc.data().photoURL)
      })
      setCurrentDMRROOM(currentDMDoc.data())
      getMessages(currentDMDoc.data().roomId) // 현재 DM방 데이터 가져온걸 바로 넣어줘 메시지들도 가져온다.
    })
  }
  
  useEffect(() => {
    getCurrentDMROOM()
  },[])
  return(
    <>
      <Header prv={true} userName={otherUserName}/>
      <MainContainer pr='0'>
      <DMDetailContainer>
        {
          chats.map(chat => {
            return(
              <DMChatting {...chat} otherUserPhotoURL={otherUserPhotoURL} />
            )
          })
        }
      </DMDetailContainer>
        <ChattingFormContainer>
        <ChattingForm onSubmit={submitChat}>
          <ChattingInput 
          type="text" 
          placeholder="메시지를 입력하세요."
          value={chat}
          onChange={(e) => {
            setChat(e.target.value)
          }}
          />
          <ChattingSubmitBtn onClick={submitChat}/>
        </ChattingForm>
      </ChattingFormContainer>
      </MainContainer>
    </>
  )
}
export default DMDetailPage