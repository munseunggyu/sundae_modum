import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import userProfile from '../../../assets/user-profile.png'
import { db } from "../../../firebase";


const DMRoomli = styled.li`
  margin-bottom:24px;  
  /* position: relative;
  display: flex;
  gap:12px; */
`;
const DMBtn = styled.button`
  position: relative;
  display: flex;
  gap:12px;
  width:100%;
  align-items:flex-end;
`;
const UserImg = styled.img`
  border-radius:50%;
  width:42px;
  height:42px;
`;
const TxtContainer = styled.div`
  display: flex;
  flex-direction:column;
  /* justify-content:space-around; */
  gap:5px;
  align-items:flex-start;
`;
const UserName = styled.strong`
  font-weight:500;
  font-size:16px;
`;
const LastChatting = styled.p`
  font-size:12px;
  opacity: 0.6;
`;

const Time = styled.time`
  position: absolute;
  bottom:0;
  right:0;
  opacity: 0.7;
  font-size:12px;
`;
function DMRoomList({names,ids,id}){
  const navigate = useNavigate()
  const userInfo = useSelector(state => state.user.currentUser)
  const [outerUserrName,setOuterUserrName] = useState('')
  const [outerUserrPhotoURL,setOuterUserrPhotoURL] = useState('')
  const otherUserId = ids.filter(id => id !== userInfo.uid)[0]
  onSnapshot(doc(db, "users", otherUserId), (doc) => {
    setOuterUserrName(doc.data().displayName)
    setOuterUserrPhotoURL(doc.data().photoURL)
  })

  // 클릭시 current DROOM 생성
  const currentDMROOM = async () => {
    const currentDMData = {
      otherUserId,
      roomId:id
    }
    await setDoc(doc(db, "current_dm", "current_dm"),currentDMData);
    navigate(`${outerUserrName}`)
  }
  return(
    <DMRoomli>
      <DMBtn onClick={currentDMROOM}>
        <UserImg src={outerUserrPhotoURL ||  userProfile} alt="" />
        <TxtContainer>
          <UserName>{outerUserrName}</UserName>
          <LastChatting>혹시 오늘 치킨 드시나요?</LastChatting>
        </TxtContainer>
        <Time>
          2022.10.06
        </Time>
      </DMBtn>
    </DMRoomli>
  )
}

export default DMRoomList