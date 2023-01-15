import Header from "../../../components/Header";
import { MainContainer } from "../../../components/MainContainer";
import DMChatting from "./DMChatting";
import React, { useEffect, useState } from "react";
import {
  doc,
  DocumentData,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import * as S from "./style";
import { useRef } from "react";
import useGetInfo from "../../../hooks/useGetInfo";
import useCollectionGroup from "../../../hooks/useCollectionGroup";
import useSubmitChat from "../../../hooks/useSubmitChat";
import PrevBtn from "../../../components/Header/PrevBtn";
import { useAuthContext } from "../../../hooks/useAuthContext";

function DMDetailPage() {
  const { state } = useAuthContext();
  const [currentDMROOM, setCurrentDMRROOM] = useState<DocumentData>([]);
  const { userName, userPhotoURL, getInfo } = useGetInfo();
  const { chats, getChats } = useCollectionGroup();
  const { chat, setChat, sendChat } = useSubmitChat();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const submitChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!scrollRef.current) return;
    const data = {
      chat,
      id: currentDMROOM.roomId,
      CreateAt: serverTimestamp(),
      writerId: state.currentUser?.uid,
    };
    if (chat) {
      sendChat({
        collectionName1: "DMMessage",
        id: currentDMROOM.roomId,
        collectionName2: "DM",
        data: data,
      });
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
    if (!state.currentUser) return;
    const currentDMRef = doc(db, "current_dm", state.currentUser.uid);
    const currentDMSnap = onSnapshot(currentDMRef, (currentDMDoc: any) => {
      getInfo(currentDMDoc.data().otherUserId);
      setCurrentDMRROOM(currentDMDoc.data());
      getChats({
        collectionName: "DM",
        whereLeft: "id",
        whereRight: currentDMDoc.data().roomId,
      });
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
