import styled from "styled-components";
import Header from "../../../common/Header"
import { MainContainer } from "../../../common/MainContainer"
import Nav from "../../../common/Nav"
import DMRoom from "./DMRoomList";

const DMRoomUl = styled.ul`
  padding-top:12px;
`;

function DMRoomLists(){
  const test = [1,2,3,4,5]
  return(
    <>
    <Header prv={true} />
    <MainContainer>
      <DMRoomUl>
        {
          test.map(v => <DMRoom value={v} key={v} />)
        }
      </DMRoomUl>
    </MainContainer>
    <Nav />
    </>
  )
}

export default DMRoomLists