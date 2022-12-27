import { deleteDoc, doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import * as S from "./style";
import userProfile from "../../../assets/user-profile.png";
import { db } from "../../../firebase";
import { useParams } from "react-router-dom";
import getDate from "../../../utils/getDate";
import handleVertical from "../../../utils/handleVertical";
import useWriter from "../../../hooks/useGetInfo";
import { CreateDMRoomId } from "../../../utils/CreateDMRoomId";

function OtherUserChatting({ CreateAt, writerId, chatTxt, chatId }) {
  const { id } = useParams();
  const time = getDate(CreateAt);
  const userInfo = useSelector((state) => state.user.currentUser);
  const { userName, userPhotoURL, getInfo } = useWriter();
  getInfo(writerId);

  const delChatting = async () => {
    const postChatDoc = doc(db, "post_chatting", id);
    await deleteDoc(doc(postChatDoc, "post", chatId));
  };

  const setDM = () => {
    const dmid = CreateDMRoomId(writerId, userInfo.uid); // DM방 생성
    const dmRoom = doc(db, "DMROOMS", dmid);

    setDoc(dmRoom, {
      id: dmid,
      CreateAt: serverTimestamp(),
      ids: [writerId, userInfo.uid],
    });
  };
  return (
    <S.OtherUserChatContainer bgc={writerId === userInfo.uid}>
      <S.UserContainer>
        <S.UserProfileImg src={userPhotoURL || userProfile} alt="유저 프로필" />
        <S.UserName>{userName}</S.UserName>
        <S.VerticalBtn
          type="button"
          onClick={() => {
            handleVertical(
              userInfo.uid,
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
