import styled from "styled-components"
import userImg from '../../../assets/user-profile.png'

const DMChattingLi = styled.li`
  display: flex;
  justify-content:${props=> props.other ? 'flex-start' : 'flex-end'};

`;
const UserProfile = styled.img`
  border-radius:50%;  
  width:44px;
  height:44px;
`;
const ChatP = styled.p`
      display: inline-block;
    max-width: 70%;
    margin-left: 12px;
    background-color: rgb(255, 255, 255);
    box-sizing: border-box;
    border-radius: ${props => props.other ? '0px 10px 10px' : '10px 0 10px 10px'};
    font-size: 14px;
    line-height: 20px;
    padding: 12px;
`;

function DMChatting({other}){
  return(
  <DMChattingLi other={other} >
    {other && <UserProfile src={userImg} alt="" />}
    <ChatP other={other} >안녕하세요</ChatP>
  </DMChattingLi>
  )
}

export default DMChatting