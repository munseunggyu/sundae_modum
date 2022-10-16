import { useParams } from "react-router-dom"
import styled from "styled-components";
import Header from "../../../common/Header"
import { MainContainer } from "../../../common/MainContainer"
import userProfile from '../../../assets/user-profile.png'
import OtherUserChatting from "./OtherUserChatting";
import arrow from '../../../assets/arrow-left.png'
import { useSelector } from "react-redux";
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
  background-color:#9ec1d0;
  border-radius:11px;
  margin:0 10px 10px 0;
`;
const JoinSpan = styled.span`
  font-size:16px;
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
  const postData = useSelector(state => state.post.currentPost)
  console.log(postData)
  return(
    <>
    <Header prv={true}  vertical={true}/>
    <MainContainer pr='0'>
      <PostDetailContainer>
      <UserContainer>
        <UserProfileImg src={userProfile && postData.writer.photoURL} alt="유저 프로필" />
        <UserName>{postData.writer.displayName} </UserName>
      </UserContainer>
      <DeadLine>
        {postData.postDate} {postData.postTime} 까지 모집
      </DeadLine>
      <ContentsTitle>
        {postData.postTit}
      </ContentsTitle>
      <ContentsTxt>
        {postData.postTxt}
      </ContentsTxt>
      {
        postData.postImg &&
      <ContentsImg src={postData.postImg} alt="" />
      }
      <JoinBtn>참여하기</JoinBtn>
      <JoinSpan> {postData.participateCount} / {postData.recruit} </JoinSpan>
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
    </>
  )
}

export default PostDetailPage