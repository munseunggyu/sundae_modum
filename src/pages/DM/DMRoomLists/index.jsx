import { useSelector } from "react-redux";
import Header from "../../../components/Header";
import { MainContainer } from "../../../components/MainContainer";
import Nav from "../../../components/Nav";
import DMRoom from "./DMRoomList";
import { useEffect } from "react";
import * as S from "./style";
import useCollection from "../../../hooks/useCollection";
import PrevBtn from "../../../components/Header/PrevBtn";

function DMRoomLists() {
  const userInfo = useSelector((state) => state.user.currentUser);
  const { documents: dmRoomList, getDocuments: getDmRoomList } =
    useCollection();
  useEffect(() => {
    getDmRoomList("DMROOMS", "ids", [userInfo.uid], "array-contains-any");
  }, []);
  return (
    <>
      <Header ir="DM채팅방 리스트">
        <PrevBtn />
      </Header>
      <MainContainer>
        {dmRoomList.length === 0 && <S.NoDMRoom>채팅방이 없습니다.</S.NoDMRoom>}
        <S.DMRoomUl>
          {dmRoomList.map((dmRoom) => (
            <DMRoom {...dmRoom} key={dmRoom.id} />
          ))}
        </S.DMRoomUl>
      </MainContainer>
      <Nav />
    </>
  );
}

export default DMRoomLists;
