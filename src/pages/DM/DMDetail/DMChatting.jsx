import { useSelector } from "react-redux";
import userImg from "../../../assets/user-profile.png";
import getDate from "../../../utils/getDate";
import * as S from "./style";

function DMChatting({ chat, CreateAt, writerId, otherUserPhotoURL }) {
  const userInfo = useSelector((state) => state.user.currentUser);

  const time = getDate(CreateAt);
  const other = userInfo.uid !== writerId;
  return (
    <S.DMChattingLi other={other}>
      {other && <S.UserProfile src={otherUserPhotoURL || userImg} alt="" />}
      <S.ChatContainer other={other}>
        <S.ChatP other={other}>{chat}</S.ChatP>
        <S.ChatTime>{time}</S.ChatTime>
      </S.ChatContainer>
    </S.DMChattingLi>
  );
}

export default DMChatting;
