import Header from "../../../components/Header";
import { MainContainer } from "../../../components/MainContainer";
import DMChatting from "./DMChatting";
import React, { useEffect, useState } from "react";
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useSelector } from "react-redux";
import * as S from "./style";
import { useRef } from "react";
import useGetInfo from "../../../hooks/useGetInfo";
import useCollectionGroup from "../../../hooks/useCollectionGroup";
import useSubmitChat from "../../../hooks/useSubmitChat";
import PrevBtn from "../../../components/Header/PrevBtn";

function DMDetailPage() {
  const userInfo = useSelector((state) => state.user.currentUser);
  const [currentDMROOM, setCurrentDMRROOM] = useState([]);
  const { userName, userPhotoURL, getInfo } = useGetInfo();
  const { chats, error, getChats } = useCollectionGroup();
  const { chat, setChat, sendChat } = useSubmitChat();
  const scrollRef = useRef(null);

  const submitChat = async (e) => {
    e.preventDefault();
    const data = {
      chat,
      id: currentDMROOM.roomId,
      CreateAt: serverTimestamp(),
      writerId: userInfo.uid,
    };
    if (chat) {
      sendChat("DMMessage", currentDMROOM.roomId, "DM", data, scrollRef);
      setChat("");

      await setDoc(doc(db, "lastMessage", currentDMROOM.roomId), {
        CreateAt: serverTimestamp(),
        id: currentDMROOM.roomId,
        chat,
      });
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // 현재 DM방 id 가져오기
  const getCurrentDMROOM = () => {
    const currentDMRef = doc(db, "current_dm", userInfo.uid);
    const currentDMSnap = onSnapshot(currentDMRef, (currentDMDoc) => {
      getInfo(currentDMDoc.data().otherUserId);
      setCurrentDMRROOM(currentDMDoc.data());
      getChats("DM", "id", currentDMDoc.data().roomId);
    });
  };

  useEffect(() => {
    getCurrentDMROOM();
  }, []);
  return (
    <>
      <Header ir={`${userName}와(과)의 DM채팅방`}>
        <PrevBtn userName={userName} />
      </Header>
      <MainContainer pr="0">
        <S.DMDetailContainer>
          {chats.map((chat) => {
            return <DMChatting {...chat} otherUserPhotoURL={userPhotoURL} />;
          })}
        </S.DMDetailContainer>
        <div ref={scrollRef} />
        <S.ChattingFormContainer>
          <S.ChattingForm onSubmit={submitChat}>
            <S.ChattingInput
              type="text"
              placeholder="메시지를 입력하세요."
              value={chat}
              onChange={(e) => {
                setChat(e.target.value);
              }}
            />
            <S.ChattingSubmitBtn onClick={submitChat} />
          </S.ChattingForm>
        </S.ChattingFormContainer>
      </MainContainer>
    </>
  );
}
export default DMDetailPage;
