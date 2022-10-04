import styled from "styled-components"
import search from '../assets/icons/icon-search.png'
import { IrH1 } from "./TextHide";
import arrow from '../assets/arrow-left.png'
const HeaderContainer= styled.article`
  width:100%;
  position:fixed;
  height:48px;
  border-bottom:0.5px solid rgb(219, 219, 219);
  background-color:white;
`;
const HeaderWrappper = styled.div`
  max-width:450px;
  margin:0 auto;
  display: flex;
  align-items:center;
  justify-content:space-between;
  padding:14px 12px;
`;
const HeaderH1 = styled.h1`
  font-size:22px;
`;
const SearchBtn = styled.button`
  background:url(${search}) center no-repeat;
  width:24px;
  height:24px;
  border:0;
`;
// h1='순대 모둠'
function Header({h1,prv,ir}){
  return(
    <HeaderContainer>
      <HeaderWrappper>
        {h1 && <HeaderH1> {h1} </HeaderH1>}
        <IrH1>{ir && ir} </IrH1>
        {prv && <img src={arrow} alt="이전" />}
        <SearchBtn />
      </HeaderWrappper>
    </HeaderContainer>
  )
}

export default Header