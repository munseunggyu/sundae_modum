import { useParams } from "react-router-dom"
import styled from "styled-components";
import Header from "../../../common/Header"
import { MainContainer } from "../../../common/MainContainer"
import userProfile from '../../../assets/user-profile.jpeg'
import OtherUserChatting from "./OtherUserChatting";
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

const DeadLine = styled.time`
  display: block;
  margin-top:20px;
  font-size:12px;
  opacity:0.7;
`;
const ContentsTitle = styled.strong`
  display: block;
  margin:20px 0;
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
  padding:10px;
`;
const PostDetailContainer = styled.div`
  background-color:#f2f2f2;
  padding-top:10px;
  margin-bottom:10px;
`;

function PostDetailPage(){
  const {id} = useParams()
  return(
    <>
    <Header prv={true}  vertical={true}/>
    <MainContainer>
      <PostDetailContainer>
      <UserContainer>
        <UserProfileImg src={userProfile} alt="유저 프로필" />
        <UserName>name</UserName>
      </UserContainer>
      <DeadLine>
        10/04 13:00 까지 모집
      </DeadLine>
      <ContentsTitle>
        오늘 1시에 치킨 드실분?
      </ContentsTitle>
      <ContentsTxt>
        오늘 1시에 치킨 드실분 계신가요? 저는 OOO기숙사에 삽니다! 
        편하신대로 DM이나 채팅 남겨주세요!
      </ContentsTxt>
      <ContentsImg src="https://images.unsplash.com/photo-1578874557108-9fc2cfb1121e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpa2VufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="" />
      </PostDetailContainer>
      <ul>
        <OtherUserChatting />
      </ul>
    <ChattingFormContainer>
      <ChattingForm>
        <ChattingInput type="text" placeholder="메시지를 입력하세요."/>
      </ChattingForm>
    </ChattingFormContainer>
    </MainContainer>
    </>
  )
}

export default PostDetailPage