import { doc, getDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import userProfile from '../../../assets/user-profile.png';
import { db } from '../../../firebase';
import {
  DMBtn,
  DMRoomli,
  LastChatting,
  Time,
  TxtContainer,
  UserImg,
  UserName,
} from './style';

function DMRoomList({ ids, id }) {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.currentUser);
  const [otherUserName, setOtherUserName] = useState('');
  const [otherUserPhotoURL, setOtherUserPhotoURL] = useState('');
  const otherUserId = ids.filter((id) => id !== userInfo.uid)[0];
  const [lastChat, setLastChat] = useState([]);
  const [time, setTime] = useState('');
  const getDate = (time) => {
    const date = time.toDate();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    let hour = date.getHours();
    hour = hour.toString().padStart(2, '0');
    let min = date.getMinutes();
    min = min.toString().padStart(2, '0');
    return `${month}/${day} ${hour}:${min}`;
  };
  // const time = getDate()
  onSnapshot(doc(db, 'users', otherUserId), (doc) => {
    setOtherUserName(doc.data().displayName);
    setOtherUserPhotoURL(doc.data().photoURL);
  });
  // 클릭시 current DROOM 생성
  const currentDMROOM = async () => {
    const currentDMData = {
      otherUserId,
      roomId: id,
    };
    await setDoc(doc(db, 'current_dm', userInfo.uid), currentDMData);
    navigate(`${otherUserName}`);
  };
  const getLastChat = async () => {
    const docRef = doc(db, 'lastMessage', id);
    const docSnap = await getDoc(docRef);
    setLastChat(docSnap.data());
    if (!docSnap.data()) {
      return;
    }
    const date = getDate(docSnap.data().CreateAt);
    console.log(docSnap.data().CreateAt);
    setTime(date);
  };
  useEffect(() => {
    getLastChat();
  }, []);
  return (
    <DMRoomli>
      <DMBtn onClick={currentDMROOM}>
        <UserImg src={otherUserPhotoURL || userProfile} alt="" />
        <TxtContainer>
          <UserName isLastChat={time}>{otherUserName}</UserName>
          {lastChat && (
            <LastChatting>
              {String(lastChat.chat).length > 10
                ? `${lastChat.chat.slice(0, 10)}...`
                : lastChat.chat}
            </LastChatting>
          )}
        </TxtContainer>
        <Time>{time && time}</Time>
      </DMBtn>
    </DMRoomli>
  );
}

export default DMRoomList;
