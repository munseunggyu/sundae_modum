import { deleteDoc, doc } from "firebase/firestore";
import * as S from "./style";
import userProfile from "../../../assets/user-profile.png";
import { db } from "../../../firebase";
import { useParams } from "react-router-dom";
import getDate from "../../../utils/getDate";
import handleVertical from "../../../utils/handleVertical";
import useWriter from "../../../hooks/useGetInfo";
import { setDM } from "../../../utils/setDM";
import { useEffect } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";

function OtherUserChatting({ CreateAt, writerId, chatTxt, chatId }: any) {
  const { id } = useParams();
  const time = getDate(CreateAt);
  const { state } = useAuthContext();
  const { userName, userPhotoURL, getInfo } = useWriter();

  const delChatting = async () => {
    if (!id) return;
    const postChatDoc = doc(db, "post_chatting", id);
    await deleteDoc(doc(postChatDoc, "post", chatId));
  };
  useEffect(() => {
    getInfo(writerId);
  }, []);
  return (
    <S.OtherUserChatContainer bgc={writerId === state.currentUser?.uid}>
      <S.UserContainer>
        <S.UserProfileImg src={userPhotoURL || userProfile} alt="유저 프로필" />
        <S.UserName>{userName}</S.UserName>
        <S.VerticalBtn
          type="button"
          onClick={() => {
            handleVertical(
              state.currentUser?.uid,
              writerId,
              "댓글을 삭제하시겠습니까?",
              delChatting,
              "쪽지를 보내겠습니까?",
              setDM
            );
          }}
        />
      </S.UserContainer>
      <S.OtherTxt>{chatTxt}</S.OtherTxt>
      <S.OtherTime>{time}</S.OtherTime>
    </S.OtherUserChatContainer>
  );
}

export default OtherUserChatting;
