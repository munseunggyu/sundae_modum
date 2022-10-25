import { deleteDoc, doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { UserContainer, UserName, UserProfileImg } from ".";
import verticalIcon from '../../../assets/icons/icon-more-vertical.png'
import userProfile from '../../../assets/user-profile.png'
import { db } from "../../../firebase";

const OtherUserChatContainer = styled.li`
width:100%;
padding-bottom:10px;
border-bottom:0.5px solid #C4C4C4;
margin-bottom:10px;
&:last-child{
  border-bottom:0;
}
`;
const OtherTxt = styled.p`
margin:10px 0;
`;
const OtherTime = styled.time`
opacity: 0.7;
font-size:14px;
`;
const VerticalBtn = styled.button`
background-image:url(${verticalIcon});
width:22px;
height:22px;
margin-left:auto;
`;

function OtherUserChatting({CreateAt,writerId,chatTxt,chatId}){
  const getDate = () => {
    const date = CreateAt.toDate()
    // const year = date.getFullYear()
    const month = date.getMonth()+1
    const day = date.getDate()
    const hour = date.getHours()
    const min = date.getMinutes()
    return `${month}/${day} ${hour}:${min}`
  }
  const time = getDate()
  const userInfo = useSelector(state => state.user.currentUser)
  const currentPost = useSelector(state => state.post.currentPost)
  const [writerName,setWriterName] = useState('')
  const [writerPhotoURL,setWriterPhotoURL] = useState('')
  onSnapshot(doc(db, "users", writerId), (doc) => {
    setWriterName(doc.data().displayName)
    setWriterPhotoURL(doc.data().photoURL)
  })
  const delChatting = async () => { // 채팅 삭제
    const postChatDoc = doc(db,"post_chatting",currentPost.postkey)
    await deleteDoc(doc(postChatDoc,"post", chatId));
    console.log('완료')
  }
    // DM의 같은 ID 값을 유지해주기 위해서
    const CreateDMRoomId = (selectUser) => {  
      return userInfo.uid > selectUser
      ? `${selectUser}${userInfo.uid}`
      :`${userInfo.uid}${selectUser}`
    }
  const setDM = (otherUser) => {
    const dmid = CreateDMRoomId(otherUser.uid) // DM방 생성
    const dmRoom = doc(db,'DMROOMS',dmid)
  
    //[방 생성자id,상대방id ]데이터 넣어준 후 DM방 데이터 가져올 시 [클릭한 유저]가 있는 list만 가져온다.
    setDoc(dmRoom,{
      id:dmid,
      CreateAt:serverTimestamp(),
      ids:[writerId,userInfo.uid],
      // names:[otherUser.displayName,userInfo.displayName],
      // photoURLs:[otherUser.photoURL,userInfo.photoURL],
    })
  }
  const verticalSubmit = (e) => {
    e.preventDefault()
    if(userInfo.uid === writerId){
    confirmAlert({
      title: '댓글을 삭제하시겠습니까?',
      buttons: [
        {
          label: '확인',
          onClick: () => {
            delChatting()
          }
        },
        {
          label: '취소'
        }
      ]
    })}
  else{
    confirmAlert({
      title: '쪽지를 보내겠습니까?',
      buttons: [
        {
          label: '확인',
          onClick: () => {
            setDM(writerId)
            console.log('DM방 생성')
          }
        },
        {
          label: '취소'
        }
      ]
    })
  }
  }
  console.log(writerId)
  return(
    <OtherUserChatContainer>
    <UserContainer>
      <UserProfileImg src={ writerPhotoURL || userProfile} alt="유저 프로필" />
      <UserName>{writerName}</UserName>
      <VerticalBtn onClick={verticalSubmit} />
    </UserContainer>
    <OtherTxt>
      {chatTxt}
    </OtherTxt>
    <OtherTime>
      {time}
    </OtherTime>
    <button 
    onClick={delChatting}
    > del</button>
  </OtherUserChatContainer>
  )
}

export default OtherUserChatting;