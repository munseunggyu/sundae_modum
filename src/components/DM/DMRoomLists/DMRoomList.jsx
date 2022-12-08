import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useGetInfo from '../../../\bhooks/useGetInfo';
import userProfile from '../../../assets/user-profile.png';
import { db } from '../../../firebase';
import getDate from '../../../utils/getDate';
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
  const otherUserId = ids.filter((id) => id !== userInfo.uid)[0];
  const [lastChat, setLastChat] = useState([]);
  const [time, setTime] = useState('');
  const { userName, userPhotoURL, getInfo } = useGetInfo();

  getInfo(otherUserId);
  // 클릭시 current DROOM 생성
  const currentDMROOM = async () => {
    const currentDMData = {
      otherUserId,
      roomId: id,
    };
    await setDoc(doc(db, 'current_dm', userInfo.uid), currentDMData);
    navigate(`${userName}`);
  };
  const getLastChat = async () => {
    const docRef = doc(db, 'lastMessage', id);
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
    <DMRoomli>
      <DMBtn onClick={currentDMROOM}>
        <UserImg src={userPhotoURL || userProfile} alt="" />
        <TxtContainer>
          <UserName isLastChat={time}>{userName}</UserName>
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
