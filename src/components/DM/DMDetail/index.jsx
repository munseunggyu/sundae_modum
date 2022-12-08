import Header from '../../../common/Header';
import { MainContainer } from '../../../common/MainContainer';
import DMChatting from './DMChatting';
import React, { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { useSelector } from 'react-redux';
import {
  ChattingForm,
  ChattingFormContainer,
  ChattingInput,
  ChattingSubmitBtn,
  DMDetailContainer,
} from './style';
import { useRef } from 'react';
import useGetInfo from '../../../\bhooks/useGetInfo';
import useCollectionGroup from '../../../\bhooks/useCollectionGroup';

function DMDetailPage() {
  const userInfo = useSelector((state) => state.user.currentUser);
  const [currentDMROOM, setCurrentDMRROOM] = useState([]);
  const [chat, setChat] = useState('');
  const { userName, userPhotoURL, getInfo } = useGetInfo();
  const { chats, error, getChats } = useCollectionGroup();

  const scrollRef = useRef(null);
  // 메시지 보내기
  const submitChat = async (e) => {
    e.preventDefault();
    if (chat) {
      const DMMessage = collection(db, 'DMMessage');
      const newId = collection(DMMessage, currentDMROOM.roomId, 'DM');
      await Promise.all([
        addDoc(newId, {
          chat,
          id: currentDMROOM.roomId,
          CreateAt: serverTimestamp(),
          writerId: userInfo.uid,
        }),
      ]);
      // 마지막 채팅
      // 데이터는 시간, 채팅내용, 방아이디,
      await setDoc(doc(db, 'lastMessage', currentDMROOM.roomId), {
        CreateAt: serverTimestamp(),
        id: currentDMROOM.roomId,
        chat,
      });
      setChat('');
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      console.log('완료');
    }
  };

  // 현재 DM방 id 가져오기
  const getCurrentDMROOM = () => {
    const currentDMRef = doc(db, 'current_dm', userInfo.uid);
    const currentDMSnap = onSnapshot(currentDMRef, (currentDMDoc) => {
      getInfo(currentDMDoc.data().otherUserId);
      setCurrentDMRROOM(currentDMDoc.data());
      getChats('DM', 'id', currentDMDoc.data().roomId);
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
