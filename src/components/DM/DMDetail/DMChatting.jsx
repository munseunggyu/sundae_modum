import { useSelector } from 'react-redux';
import styled from 'styled-components';
import userImg from '../../../assets/user-profile.png';

const DMChattingLi = styled.li`
  display: flex;
  justify-content: ${(props) => (props.other ? 'flex-start' : 'flex-end')};
  margin-top: 10px;
`;
const UserProfile = styled.img`
  border-radius: 50%;
  width: 44px;
  height: 44px;
  margin-right: 12px;
`;
const ChatContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: ${(props) => (props.other ? 'row' : 'row-reverse')};
  max-width: 70%;
`;
const ChatP = styled.p`
  display: inline-block;
  background-color: rgb(255, 255, 255);
  box-sizing: border-box;
  border-radius: ${(props) =>
    props.other ? '0px 10px 10px' : '10px 0 10px 10px'};
  font-size: 14px;
  line-height: 20px;
  padding: 12px;
  max-width: 300px;
  white-space: -moz-pre-wrap; /* Mozilla, supported since 1999 */
  white-space: -pre-wrap; /* Opera */
  white-space: -o-pre-wrap; /* Opera */
  white-space: pre-wrap; /* CSS3 - Text module (Candidate Recommendation) http://www.w3.org/TR/css3-text/#white-space */
  word-wrap: break-word;
`;

const ChatTime = styled.time`
  font-size: 10px;
  align-self: flex-end;
`;
function DMChatting({ chat, CreateAt, writerId, otherUserPhotoURL }) {
  const userInfo = useSelector((state) => state.user.currentUser);
  const getDate = () => {
    const date = CreateAt.toDate();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let hour = date.getHours();
    hour = hour.toString().padStart(2, '0');
    let min = date.getMinutes();
    min = min.toString().padStart(2, '0');
    return `${month}/${day} ${hour}:${min}`;
  };
  const time = getDate();
  const other = userInfo.uid !== writerId;
  return (
    <DMChattingLi other={other}>
      {other && <UserProfile src={otherUserPhotoURL || userImg} alt="" />}
      <ChatContainer other={other}>
        <ChatP other={other}>{chat}</ChatP>
        <ChatTime>{time}</ChatTime>
      </ChatContainer>
    </DMChattingLi>
  );
}

export default DMChatting;
