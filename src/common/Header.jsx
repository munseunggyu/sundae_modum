import styled from "styled-components"
import searchIcon from '../assets/icons/icon-search.png' 
import { IrH1 } from "./TextHide";
import arrow from '../assets/arrow-left.png'
import headerLogo from '../assets/header-logo.png'
import verticalIcon from '../assets/icons/icon-more-vertical.png'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const HeaderContainer= styled.article`
  width:100%;
  position:fixed;
  height:48px;
  overflow:hidden;
  border-bottom:0.5px solid rgb(219, 219, 219);
  background-color:white;
  z-index: 10;
  `;
const HeaderWrappper = styled.header`
  max-width:450px;
  margin:0 auto;
  display: flex;
  align-items:center;
  justify-content:space-between;
  padding:14px 12px;
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
const RightIconBtn = styled.button`
  background:url(${props => props.icon}) center no-repeat;
  width:22px;
  height:22px;
`;
const UploadBtn = styled.button`
  background-color:${props => props.theme.mainColor};
  width:80px;
  /* padding:7px 0; */
  height:22px;
  color:white;
  border-radius:32px; 
  font-size:14px;
  /* position: relative;
  bottom:4px; */
`;
const PrvBtn = styled.button`
  background:url(${arrow});
  width:22px;
  height:22px;
`;
const Div = styled.div`
  display: flex;
  align-items:center;
  gap:5px;
  font-size:18px;
`;
const UserName = styled.div`
  top:1px;
  position: relative;
`;

function Header({h1,prv,ir,search,upload,vertical,userName,onSubmit}){
  const navigate = useNavigate()
  return(
    <>
    <HeaderContainer>
      <HeaderWrappper>
        {h1 && <HeaderH1> {h1} </HeaderH1>}
        
        {ir && (<IrH1> {ir} </IrH1>)}
        {prv && 
          (
            <Div>
              <PrvBtn
              alt="이전" 
              onClick={() => navigate(-1)}
              />
              {userName && <UserName> {userName} </UserName>}
            </Div>
          )
        }
        
        {vertical && <RightIconBtn icon={verticalIcon} 
        />}
        {search && <RightIconBtn icon={searchIcon} />}
        {upload && 
        <UploadBtn onClick={onSubmit}>업로드</UploadBtn>
        }
      </HeaderWrappper>
    </HeaderContainer>
    </>
  )
}

export default Header