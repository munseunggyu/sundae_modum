import Header from "../../../components/Header";
import { MainContainer } from "../../../components/MainContainer";
import DMChatting from "./DMChatting";
import React, { useEffect, useState } from "react";
import { doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { useSelector } from "react-redux";
import {
  ChattingForm,
  ChattingFormContainer,
  ChattingInput,
  ChattingSubmitBtn,
  DMDetailContainer,
} from "./style";
import { useRef } from "react";
import useGetInfo from "../../../hooks/useGetInfo";
import useCollectionGroup from "../../../hooks/useCollectionGroup";
import useSubmitChat from "../../../hooks/useSubmitChat";

function DMDetailPage() {
  const userInfo = useSelector((state) => state.user.currentUser);
  const [currentDMROOM, setCurrentDMRROOM] = useState([]);
  // const [chat, setChat] = useState('');
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
      <Header
        ir={`${userName}와(과)의 DM채팅방`}
        prv={true}
        userName={userName}
      />
      <MainContainer pr="0">
        <DMDetailContainer>
          {chats.map((chat) => {
            return <DMChatting {...chat} otherUserPhotoURL={userPhotoURL} />;
          })}
        </DMDetailContainer>
        <div ref={scrollRef} />
        <ChattingFormContainer>
          <ChattingForm onSubmit={submitChat}>
            <ChattingInput
              type="text"
              placeholder="메시지를 입력하세요."
              value={chat}
              onChange={(e) => {
                setChat(e.target.value);
              }}
            />
            <ChattingSubmitBtn onClick={submitChat} />
          </ChattingForm>
        </ChattingFormContainer>
      </MainContainer>
    </>
  );
}
export default DMDetailPage;
