import { useSelector } from "react-redux";
import styled from "styled-components";
import Header from "../../../common/Header"
import { MainContainer } from "../../../common/MainContainer"
import Nav from "../../../common/Nav"
import DMRoom from "./DMRoomList";
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore"
import { db } from "../../../firebase";
import { useEffect, useState } from "react";

const DMRoomUl = styled.ul`
  padding-top:12px;
`;

function DMRoomLists(){
  const [dmRooms,setDmRooms] = useState([])
  const userInfo = useSelector(state => state.user.currentUser)
  const getDMROOMS = async () => {    //  [방 생성자id,상대방id ]데이터 넣어준 후 DM방 데이터 가져올 시 [클릭한 유저]가 있는 list만 가져온다.
    const q = query(collection(db,'DMROOMS'),where('ids','array-contains-any',[userInfo.uid],orderBy('CreateAt','asc')))
    onSnapshot(q,snapshot => {
      const newarr = snapshot.docs.map(doc => 
        ({
        id:doc.id,
        ...doc.data(),
      })
      )
      setDmRooms(newarr)
    })
  }
  useEffect(() => {
    getDMROOMS()
  },[])
  return(
    <>
    <Header prv={true} />
    <MainContainer>
      <DMRoomUl>
        {
          dmRooms.map(v => <DMRoom {...v} key={v.id} />)
        }
      </DMRoomUl>
    </MainContainer>
    <Nav />
    </>
  )
}

export default DMRoomLists