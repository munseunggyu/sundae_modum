import { doc, DocumentData, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useGetInfo from "../../../hooks/useGetInfo";
import userProfile from "../../../assets/user-profile.png";
import { db } from "../../../firebase";
import getDate from "../../../utils/getDate";
import * as S from "./style";
import { useAuthContext } from "../../../hooks/useAuthContext";
interface ICreateAt {
  nanoseconds: number;
  seconds: number;
}
interface IDMRoomList {
  ids: string[];
  id: string;
  CreateAt?: ICreateAt;
}

function DMRoomList({ ids, id }: IDMRoomList) {
  const navigate = useNavigate();
  const { state } = useAuthContext();
  const otherUserId = ids.filter((id): boolean => {
    return id !== state.currentUser?.uid;
  })[0];
  const [lastChat, setLastChat] = useState<DocumentData>();
  const [time, setTime] = useState("");
  const { userName, userPhotoURL, getInfo } = useGetInfo();
  getInfo(otherUserId);
  const currentDMROOM = async () => {
    const currentDMData = {
      otherUserId,
      roomId: id,
    };
    if (!state.currentUser) return;
    await setDoc(doc(db, "current_dm", state.currentUser?.uid), currentDMData);
    navigate(`${userName}`);
  };
  const getLastChat = async () => {
    const docRef = doc(db, "lastMessage", id);
    const docSnap: DocumentData = await getDoc(docRef);
    setLastChat(docSnap.data());
    const date = getDate(docSnap.data()?.CreateAt);
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
          <S.UserName isLastChat={time ? true : false}>{userName}</S.UserName>
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
