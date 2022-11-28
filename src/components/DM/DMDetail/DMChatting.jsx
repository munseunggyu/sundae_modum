import { useSelector } from 'react-redux';
import styled from 'styled-components';
import userImg from '../../../assets/user-profile.png';
import {
  ChatContainer,
  ChatP,
  ChatTime,
  DMChattingLi,
  UserProfile,
} from './style';

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
