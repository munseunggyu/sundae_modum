import userImg from "../../../assets/user-profile.png";
import { useAuthContext } from "../../../hooks/useAuthContext";
import getDate from "../../../utils/getDate";
import * as S from "./style";

interface IDMChatting {
  chat: string;
  CreateAt: any;
  writerId: string;
  otherUserPhotoURL: string;
}

function DMChatting({
  chat,
  CreateAt,
  writerId,
  otherUserPhotoURL,
}: IDMChatting) {
  const { state } = useAuthContext();

  const time = getDate(CreateAt);
  const other = state.currentUser?.uid !== writerId;
  return (
    <S.DMChattingLi other={other}>
      {other && (
        <S.UserProfile src={otherUserPhotoURL || userImg} alt="프로필 이미지" />
      )}
      <S.ChatContainer other={other}>
        <S.ChatP other={other}>{chat}</S.ChatP>
        <S.ChatTime>{time}</S.ChatTime>
      </S.ChatContainer>
    </S.DMChattingLi>
  );
}

export default DMChatting;
