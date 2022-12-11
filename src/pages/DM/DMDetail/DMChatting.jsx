import { useSelector } from 'react-redux';
import userImg from '../../../assets/user-profile.png';
import getDate from '../../../utils/getDate';
import {
  ChatContainer,
  ChatP,
  ChatTime,
  DMChattingLi,
  UserProfile,
} from './style';

function DMChatting({ chat, CreateAt, writerId, otherUserPhotoURL }) {
  const userInfo = useSelector((state) => state.user.currentUser);

  const time = getDate(CreateAt);
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
