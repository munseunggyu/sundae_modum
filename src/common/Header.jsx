import styled from "styled-components"
import search from '../assets/icons/icon-search.png'
import { IrH1 } from "./TextHide";
import arrow from '../assets/arrow-left.png'
import headerLogo from '../assets/header-logo.png'
import { useNavigate } from "react-router-dom";
const HeaderContainer= styled.article`
  width:100%;
  position:fixed;
  height:48px;
  overflow:hidden;
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
`;
const UploadBtn = styled.button`
  background-color:${props => props.theme.mainColor};
  padding:7px 0;
  width:90px;
  color:white;
  border-radius:32px; 
  position:relative;
  bottom:4px; 
  font-size:14px;
`;
const PrvBtn = styled.button`
  background:url(${arrow});
  width:22px;
  height:22px;
  position: relative;
  bottom:4px;
`;
// h1='순대 모둠'
function Header({h1,prv,ir,search,upload}){
  const navigate = useNavigate()
  return(
    <HeaderContainer>
      <HeaderWrappper>
        {h1 && <HeaderH1> {h1} </HeaderH1>}
        {ir && (<IrH1> {ir} </IrH1>)}
        {prv && 
          (
          <PrvBtn
          alt="이전" 
          onClick={() => navigate(-1)}
          />)
        }
        {search && <SearchBtn />}
        {upload && 
        <UploadBtn>업로드</UploadBtn>
        }
      </HeaderWrappper>
    </HeaderContainer>
  )
}

export default Header