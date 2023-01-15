import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetInfo from "../../../hooks/useGetInfo";
import userProfile from "../../../assets/user-profile.png";
import { db } from "../../../firebase";
import getDate from "../../../utils/getDate";
import * as S from "./style";
import { useAuthContext } from "../../../hooks/useAuthContext";

function DMRoomList({ ids, id }) {
  const navigate = useNavigate();
  const { state } = useAuthContext();
  const otherUserId = ids.filter((id) => id !== state.currentUser?.uid)[0];
  const [lastChat, setLastChat] = useState([]);
  const [time, setTime] = useState("");
  const { userName, userPhotoURL, getInfo } = useGetInfo();

  getInfo(otherUserId);
  const currentDMROOM = async () => {
    const currentDMData = {
      otherUserId,
      roomId: id,
    };
    await setDoc(doc(db, "current_dm", state.currentUser?.uid), currentDMData);
    navigate(`${userName}`);
  };
  const getLastChat = async () => {
    const docRef = doc(db, "lastMessage", id);
    const docSnap = await getDoc(docRef);
    setLastChat(docSnap.data());
    if (!docSnap.data()) {
      return;
    }
    const date = getDate(docSnap.data().CreateAt);
    setTime(date);
  };
  useEffect(() => {
    getLastChat();
  }, []);
  return (
    <S.DMRoomli>
      <S.DMBtn onClick={currentDMROOM}>
        <S.UserImg src={userPhotoURL || userProfile} alt="" />
        <S.TxtContainer>
          <S.UserName isLastChat={time}>{userName}</S.UserName>
          {lastChat && (
            <S.LastChatting>
              {String(lastChat.chat).length > 10
                ? `${lastChat.chat.slice(0, 10)}...`
                : lastChat.chat}
            </S.LastChatting>
          )}
        </S.TxtContainer>
        <S.Time>{time && time}</S.Time>
      </S.DMBtn>
    </S.DMRoomli>
  );
}

export default DMRoomList;
