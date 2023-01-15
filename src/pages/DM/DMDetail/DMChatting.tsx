import userImg from "../../../assets/user-profile.png";
import { useAuthContext } from "../../../hooks/useAuthContext";
import getDate from "../../../utils/getDate";
import * as S from "./style";

function DMChatting({ chat, CreateAt, writerId, otherUserPhotoURL }: any) {
  const { state } = useAuthContext();

  const time = getDate(CreateAt);
  const other = state.currentUser?.uid !== writerId;
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
