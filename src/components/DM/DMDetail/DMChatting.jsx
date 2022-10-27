import styled from "styled-components"
import userImg from '../../../assets/user-profile.png'

const DMChattingLi = styled.li`
  display: flex;
  justify-content:${props=> props.other ? 'flex-start' : 'flex-end'};
  margin-top:10px;
`;
const UserProfile = styled.img`
  border-radius:50%;  
  width:44px;
  height:44px;
  margin-right:12px;
`;
const ChatContainer = styled.div`
  display: flex;
  gap:5px;
  flex-direction:${props => props.other ? 'row' : 'row-reverse'};
  max-width:70%;
`;
const ChatP = styled.p`
  display: inline-block;
  /* max-width: 70%; */
  background-color: rgb(255, 255, 255);
  box-sizing: border-box;
  border-radius: ${props => props.other ? '0px 10px 10px' : '10px 0 10px 10px'};
  font-size: 14px;
  line-height: 20px;
  padding: 12px;
`;

const ChatTime = styled.time`
  font-size:10px;
  align-self:flex-end;
`;
function DMChatting({other}){
  return(
  <DMChattingLi other={other} >
    {other && <UserProfile src={userImg} alt="" />}
    <ChatContainer other={other}>
      <ChatP other={other} >안녕하세요</ChatP>
      <ChatTime>2017</ChatTime>
    </ChatContainer>
  </DMChattingLi>
  )
}

export default DMChatting