import styled from "styled-components"
import search from '../assets/icons/icon-search.png'
import { IrH1 } from "./TextHide";
import arrow from '../assets/arrow-left.png'
import headerLogo from '../assets/header-logo.png'
const HeaderContainer= styled.article`
  width:100%;
  position:fixed;
  height:48px;
  border-bottom:0.5px solid rgb(219, 219, 219);
  `;
const HeaderWrappper = styled.div`
  max-width:450px;
  margin:0 auto;
  display: flex;
  align-items:center;
  justify-content:space-between;
  padding:14px 12px;
  background-color:white;
  font-weight:600;
`;
const HeaderH1 = styled.h1`
  font-size:22px;
  margin-left:50px;
  position: relative;
  &::before{
    content:"";
    background:url(${headerLogo}) center/50px 50px;
    position:absolute;
    width:50px;
    height:50px;
    top:-13px;
    left:-50px; 
  }
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