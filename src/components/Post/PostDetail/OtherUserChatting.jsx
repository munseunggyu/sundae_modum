import styled from "styled-components";
import { UserContainer, UserName, UserProfileImg } from ".";
import verticalIcon from '../../../assets/icons/icon-more-vertical.png'
import userProfile from '../../../assets/user-profile.png'

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

function OtherUserChatting({CreateAt,writer,chatTxt}){
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
  return(
    <OtherUserChatContainer>
    <UserContainer>
      <UserProfileImg src={ writer.photoURL || userProfile} alt="유저 프로필" />
      <UserName>{writer.displayName}</UserName>
      <VerticalBtn />
    </UserContainer>
    <OtherTxt>
      {chatTxt}
    </OtherTxt>
    <OtherTime>
      {time}
    </OtherTime>
  </OtherUserChatContainer>
  )
}

export default OtherUserChatting;