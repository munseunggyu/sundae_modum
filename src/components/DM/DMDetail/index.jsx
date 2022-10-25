import { useParams } from "react-router-dom"
import styled from "styled-components";
import Header from "../../../common/Header"
import { MainContainer } from "../../../common/MainContainer"
import arrow from '../../../assets/arrow-left.png'
import DMChatting from "./DMChatting";
const DMDetailContainer = styled.ul`
  width:100%;
  background-color:#f2f2f2;
  height:calc(100vh - 96px);
  display: flex;
  flex-direction:column;
  justify-content:flex-end;
  padding:16px;


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

function DMDetailPage(){
  // 자 이부분 해봅시다 DM날리는 부분 
  // 그럼 우선 채팅부터 그 아이디에 맞게 보내야겠죠 그럴려면 어캐해야죠? 
  // 만든 DM방을 찾고 firebase에 currentDM을 저장한다.
  // 그 해당 DM방 아이디로 Firebase에 또 그 채팅방의 채팅내역들을 만든다.
  // 
  return(
    <>
      <Header prv={true} userName='목짧은 기린' vertical={true}/>
      <MainContainer pr='0'>
      <DMDetailContainer>
        <DMChatting other={true} />
        <DMChatting />
      </DMDetailContainer>
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
export default DMDetailPage