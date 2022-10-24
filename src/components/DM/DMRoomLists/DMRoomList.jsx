import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import userProfile from '../../../assets/user-profile.png'


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
function DMRoomList({names,photoURLs}){
  const navigate = useNavigate()
  const userInfo = useSelector(state => state.user.currentUser)
  console.log(photoURLs.filter(photoURL => photoURL !== userInfo.photoURL))
  return(
    <DMRoomli>
      <DMBtn onClick={() => navigate(`${names.filter(name => name !== userInfo.displayName)[0]}`)}>
        <UserImg src={photoURLs.filter(photoURL => photoURL !== userInfo.photoURL)[0] ||  userProfile} alt="" />
        <TxtContainer>
          <UserName>{names.filter(name => name !== userInfo.displayName)[0]}</UserName>
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