import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Header from '../../../common/Header';
import { MainContainer } from '../../../common/MainContainer';
import Nav from '../../../common/Nav';
import DMRoom from './DMRoomList';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import { useEffect, useState } from 'react';
import { DMRoomUl, NoDMRoom } from './style';
import useCollection from '../../../\bhooks/useCollection';

function DMRoomLists() {
  const [dmRooms, setDmRooms] = useState([]);
  const userInfo = useSelector((state) => state.user.currentUser);
  const getDMROOMS = () => {
    //  [방 생성자id,상대방id ]데이터 넣어준 후 DM방 데이터 가져올 시 [클릭한 유저]가 있는 list만 가져온다.
    const q = query(
      collection(db, 'DMROOMS'),
      where(
        'ids',
        'array-contains-any',
        [userInfo.uid],
        orderBy('CreateAt', 'asc')
      )
    );
    onSnapshot(q, (snapshot) => {
      const newarr = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setDmRooms(newarr);
    });
  };
  useEffect(() => {
    getDMROOMS();
  }, []);
  return (
    <>
      <Header prv={true} ir="DM채팅방 리스트" />
      <MainContainer>
        {dmRooms.length === 0 && <NoDMRoom>채팅방이 없습니다.</NoDMRoom>}
        <DMRoomUl>
          {dmRooms.map((dmRoom) => (
            <DMRoom {...dmRoom} key={dmRoom.id} />
          ))}
        </DMRoomUl>
      </MainContainer>
      <Nav />
    </>
  );
}

export default DMRoomLists;
