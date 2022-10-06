import styled from "styled-components";
import Header from "../../../common/Header"
import { MainContainer } from "../../../common/MainContainer"
import Nav from "../../../common/Nav"
import DMRoom from "./DMRoom";

const DMRoomUl = styled.ul`
  padding-top:12px;
`;

function DMRoomList(){
  const test = [1,2,3,4,5,6,7,8,9,10]
  return(
    <>
    <Header prv={true} vertical={true}/>
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

export default DMRoomList