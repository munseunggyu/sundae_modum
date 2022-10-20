import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components";
import Header from "../../../common/Header"
import { MainContainer } from "../../../common/MainContainer"
import userProfile from '../../../assets/user-profile.png'
import OtherUserChatting from "./OtherUserChatting";
import arrow from '../../../assets/arrow-left.png'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { collection, collectionGroup, deleteDoc, doc, getDoc, getDocs, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { setCurrentPost } from "../../../redux/actions/post_action";
import Chatting from "../../../common/ChattingForm";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; 

export const UserContainer = styled.div`
  display: flex;
  align-items:center;
  gap:10px;
  width:100%;
`;
export const UserProfileImg = styled.img`
  width:42px;
  height:42px;
  border-radius:50%;
`;
export const UserName = styled.span`
  font-weight:500;
`;
const PostDetailContainer = styled.div`
  padding:10px 12px 0;
  margin-bottom:10px;
  border-bottom: 1px solid #C4C4C4;

`;
const DeadLine = styled.time`
  display: block;
  margin-top:20px;
  font-size:12px;
  opacity:0.7;
`;
const ContentsTitle = styled.strong`
  display: block;
  margin:10px 0;
  font-weight:600;
  font-size:18px;
`;
const ContentsTxt = styled.p`
  font-size:16px;
  margin-bottom:20px;
`;
const ContentsImg = styled.img`
  width:100%;
  height:350px;
  border-radius:44px;
  padding-bottom:20px;
  display: block;
  margin:0 auto;  
`;
const JoinBtn = styled.button`
  width:80px;
  padding:10px 0;
  color:white;
  background-color:#6BB4D3; //#9ec1d0
  border-radius:11px;
  margin:0 10px 10px 0;
`;
const JoinSpan = styled.span`
  font-size:16px;
`;
const PartyName = styled.span`
  margin-right:5px;
`;

function PostDetailPage(){
  const {id} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentPost = useSelector(state => state.post)
  const userInfo = useSelector(state => state.user.currentUser)
  const [chattings,setChattings] = useState([])

  // 댓글 불러오기
  const getChatting = async (id) => {
    try{
      const q = query(collectionGroup (db, 'post'),where('currentPostId', '==', id),orderBy('CreateAt','asc'))
      const querySnapshot = await getDocs(q);
      onSnapshot(q,querySnapshot => {
        const newChatting = querySnapshot.docs.map(doc => {
          return doc.data({ serverTimestamps: "estimate" })
        })
        setChattings(newChatting)
      })
    }catch(error){
      console.log(error)
    }
  }
  const getCurrentPost =  () => {
    // 사용자에게 정보를 빠르게 보여주기 위해 실시간 업데이트 수신 대기 함수 사용
    const currentPostRef = doc(db,'current_post','current_post')
    const currentPostSnap =  onSnapshot(currentPostRef,doc => {
      dispatch(setCurrentPost(doc.data()))
      getChatting(doc.data().postkey)
    })
  }
  // 참여하기 버튼 기능
  const handlePartyBtn = async () => {
    // 이미 참여하고있으면 return해 준다.
    const included = currentPost.currentPost.party.participants.find(participant => participant.uid === userInfo.uid)
    if(included) return
    const newParty = {
      ...currentPost.currentPost.party,
      participants:[...currentPost.currentPost.party.participants,
        {
          displayName:userInfo.displayName,
          uid:userInfo.uid
        }
      ],
      participateCount: currentPost.currentPost.party.participants.length+1
    }
    // 먼저 current_post가 있는 데이터베이스에 참여자를 추가한다 그후 posts에 있는 해당 방에도 업데이트 해준다.
    // 사용자가 버튼 클릭시 숫자가 올라가는 것을 빨리 보여주기 위해 먼저 current_post데이터 먼저 업데이트 해준다.
    const currentPostRef = doc(db,'current_post','current_post')
    await updateDoc(currentPostRef,{
      party:newParty
    })
    const postRef = doc(db, "posts",currentPost.currentPost.postkey);
      await updateDoc(postRef,{
        party:newParty
      })
    console.log('완료')
  }
  // 참여 취소하기 버튼 기능
  const handlePartyCanCelBtn = async () => {
    const included = currentPost.currentPost.party.participants.find(participant => participant.uid === userInfo.uid)
    if(!included) return
    const cancel = currentPost.currentPost.party.participants.filter(v => v.uid !== userInfo.uid)
    const newParty = {
      ...currentPost.currentPost.party,
      participants:[...cancel],
      participateCount: currentPost.currentPost.party.participants.length-1
    }
    // 먼저 current_post가 있는 데이터베이스에 참여자를 추가한다 그후 posts에 있는 해당 방에도 업데이트 해준다.
    // 사용자가 버튼 클릭시 숫자가 올라가는 것을 빨리 보여주기 위해 먼저 current_post데이터 먼저 업데이트 해준다.
    const currentPostRef = doc(db,'current_post','current_post')
    await updateDoc(currentPostRef,{
      party:newParty
    })
    const postRef = doc(db, "posts",currentPost.currentPost.postkey);
      await updateDoc(postRef,{
        party:newParty
      })
    console.log('완료')
  }
 
  const delPost = async () => {
    await deleteDoc(doc(db, "posts", currentPost.currentPost.postkey))
    navigate('/')
  }
  // DM의 같은 ID 값을 유지해주기 위해서
  const CreateDMRoomId = (selectUser) => {  
    return userInfo.uid > selectUser
    ? `${selectUser}${userInfo.uid}`
    :`${userInfo.uid}${selectUser}`
  }
  // 게시글 작성자와 DM하기 위해 방을 만든다.
  const setDM = (otherUser) => {
    const dmid = CreateDMRoomId(otherUser.uid) // DM방 생성
    const dmRoom = doc(db,'DMROOMS',dmid)
  
    //[방 생성자id,상대방id ]데이터 넣어준 후 DM방 데이터 가져올 시 [클릭한 유저]가 있는 list만 가져온다.
    setDoc(dmRoom,{
      id:dmid,
      CreateAt:serverTimestamp(),
      ids:[otherUser.uid,userInfo.uid],
      names:[otherUser.displayName,userInfo.displayName],
      photoURLs:[otherUser.photoURL,userInfo.photoURL],
    })
  }

  const verticalSubmit = (e) => {
    e.preventDefault()
    if(userInfo.uid === currentPost.currentPost.writer.uid){
    confirmAlert({
      title: '게시글을 삭제하시겠습니까?',
      buttons: [
        {
          label: '확인',
          onClick: () => {
            delPost()
          }
        },
        {
          label: '취소'
        }
      ]
    })}
  else{
    confirmAlert({
      title: '쪽지를 보내겠습니까?',
      buttons: [
        {
          label: '확인',
          onClick: () => {
            setDM(currentPost.currentPost.writer)
            console.log('DM방 생성')
          }
        },
        {
          label: '취소'
        }
      ]
    })
  }
  }
  


  useEffect( () => {
    getCurrentPost()
  },[])
  return(
  <>
    {
      currentPost.isLoding
      ? (<>...Loding</>)
      :
      (<>
      <Header prv={true}  vertical={true} verticalSubmit={verticalSubmit}/>
      <MainContainer pr='0'>
        <PostDetailContainer>
        <UserContainer>
          <UserProfileImg src={ currentPost.currentPost.writer.photoURL || userProfile} alt="유저 프로필" />
          <UserName>{currentPost.currentPost.writer.displayName} </UserName>
        </UserContainer>
        <DeadLine>
          {currentPost.currentPost.postDate} {currentPost.currentPost.postTime} 까지 모집
        </DeadLine>
        <ContentsTitle>
          {currentPost.currentPost.postTit}
        </ContentsTitle>
        <ContentsTxt>
          {currentPost.currentPost.postTxt}
        </ContentsTxt>
        {
          currentPost.currentPost.postImg &&
        <ContentsImg src={currentPost.currentPost.postImg} alt="" />
        }
        <JoinBtn onClick={handlePartyBtn}>참여하기</JoinBtn>
        <JoinBtn onClick={handlePartyCanCelBtn}>취소하기</JoinBtn>
        <JoinSpan> {currentPost.currentPost.party.participateCount} / {currentPost.currentPost.party.recruit} </JoinSpan>
        <div >
        {
        currentPost.currentPost.party.participants.map(participant => 
          <PartyName key={participant.uid}>{participant.displayName}</PartyName>
          )
        }
        </div>
        </PostDetailContainer>
        <ul>
          {chattings.map((chatting,i) => 
              <OtherUserChatting  {...chatting}/>
            )}
        </ul>
        <Chatting />
      </MainContainer> 
      </>)
    }
  </>
  )
}

export default PostDetailPage