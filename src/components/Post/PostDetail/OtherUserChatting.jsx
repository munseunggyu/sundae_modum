import styled from "styled-components";
import { UserContainer, UserName, UserProfileImg } from ".";
import verticalIcon from '../../../assets/icons/icon-more-vertical.png'
import userProfile from '../../../assets/user-profile.jpeg'

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

function OtherUserChatting(){
  return(
    <OtherUserChatContainer>
    <UserContainer>
      <UserProfileImg src={userProfile} alt="유저 프로필" />
      <UserName>name</UserName>
      <VerticalBtn />
    </UserContainer>
    <OtherTxt>
      저 먹고 싶습니다!
    </OtherTxt>
    <OtherTime>
      10/04 11:05
    </OtherTime>
  </OtherUserChatContainer>
  )
}

export default OtherUserChatting;