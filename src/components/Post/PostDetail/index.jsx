import { useParams } from "react-router-dom"
import styled from "styled-components";
import Header from "../../../common/Header"
import { MainContainer } from "../../../common/MainContainer"
import userProfile from '../../../assets/user-profile.png'
import OtherUserChatting from "./OtherUserChatting";
import arrow from '../../../assets/arrow-left.png'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs, onSnapshot, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../../firebase";
import { setCurrentPost } from "../../../redux/actions/post_action";
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
const ChattingFormContainer = styled.div`
  display: flex;
  justify-content:center;
`;
const ChattingForm = styled.form`
  position: fixed;
  bottom:0;
  max-width:450px;  
  width:100%;
`;
const ChattingInput = styled.input`
  outline:none;
  width:100%;
  font-size:16px;
  padding:15px 30px 15px 15px;
  border:0;
  border-top:0.5px solid #DBDBDB;
`;

const ChattingSubmitBtn = styled.button`
  position: absolute;
  right:10px;
  background:url(${arrow});
  transform:rotateY(180deg);
  width:22px;
  height:22px;
  top:15px;
`;
function PostDetailPage(){
  const {id} = useParams()
  const dispatch = useDispatch()
  const currentPost = useSelector(state => state.post)
  const userInfo = useSelector(state => state.user.currentUser)
  const getCurrentPost =  () => {
    // 사용자에게 정보를 빠르게 보여주기 위해 실시간 업데이트 수신 대기 함수 사용
    const currentPostRef = doc(db,'current_post','current_post')
    const currentPostSnap =  onSnapshot(currentPostRef,doc => {
      // console.log(doc.data())
      dispatch(setCurrentPost(doc.data()))
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
      <Header prv={true}  vertical={true}/>
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
        {
          currentPost.currentPost.party.participants.map(participant => 
            <div key={participant.uid}>
              <PartyName>{participant.displayName}</PartyName>
            </div>
            )
        }
        </PostDetailContainer>
        <ul>
        <OtherUserChatting />
        <OtherUserChatting />
        <OtherUserChatting />
        </ul>
      <ChattingFormContainer>
        <ChattingForm>
          <ChattingInput type="text" placeholder="메시지를 입력하세요."/>
          <ChattingSubmitBtn />
        </ChattingForm>
      </ChattingFormContainer>
      </MainContainer> 
      </>)
    }
  </>
  )
}

export default PostDetailPage