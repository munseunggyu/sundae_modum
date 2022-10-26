import { useParams } from "react-router-dom"
import styled from "styled-components";
import Header from "../../../common/Header"
import { MainContainer } from "../../../common/MainContainer"
import arrow from '../../../assets/arrow-left.png'
import DMChatting from "./DMChatting";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";
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
  const [currentDMROOM, setCurrentDMRROOM] = useState([])
  useEffect(() => {
    const currentDMRef = doc(db,'current_dm','current_dm')
    const currentDMSnap =  onSnapshot(currentDMRef,currentDMDoc => {
      setCurrentDMRROOM(currentDMDoc.data())
    })
  },[])
  console.log(currentDMROOM)
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