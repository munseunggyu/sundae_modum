import { useSelector } from 'react-redux';
import Header from '../../../common/Header';
import { MainContainer } from '../../../common/MainContainer';
import Nav from '../../../common/Nav';
import DMRoom from './DMRoomList';
import { useEffect } from 'react';
import { DMRoomUl, NoDMRoom } from './style';
import useCollection from '../../../hooks/useCollection';

function DMRoomLists() {
  const userInfo = useSelector((state) => state.user.currentUser);
  const { documents, getDocuments } = useCollection();

  useEffect(() => {
    getDocuments('DMROOMS', 'ids', [userInfo.uid], 'array-contains-any');
  }, []);
  return (
    <>
      <Header prv={true} ir="DM채팅방 리스트" />
      <MainContainer>
        {documents.length === 0 && <NoDMRoom>채팅방이 없습니다.</NoDMRoom>}
        <DMRoomUl>
          {documents.map((dmRoom) => (
            <DMRoom {...dmRoom} key={dmRoom.id} />
          ))}
        </DMRoomUl>
      </MainContainer>
      <Nav />
    </>
  );
}

export default DMRoomLists;
