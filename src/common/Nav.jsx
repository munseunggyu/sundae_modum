import styled from "styled-components"
import edit from '../assets/icons/icon-edit.png'
import editFill from '../assets/icons/icon-edit-fill.png'
import home from '../assets/icons/icon-home.png'
import homeFill from '../assets/icons/icon-home-fill.png'
import user from '../assets/icons/icon-user.png'
import userFill from '../assets/icons/icon-user-fill.png'
import message from '../assets/icons/icon-message-circle.png'
import messageFill from '../assets/icons/icon-message-fill.png'
import {  Link, useMatch, useNavigate } from "react-router-dom"
import { IrH2 } from "./TextHide"
const NavContainer = styled.nav`
  width:100%;
  position:fixed;
  bottom:0;
  height:56px;
  border-top:0.5px solid rgb(219, 219, 219);
  background-color:white;
`;
const IconsUl = styled.ul`
  max-width:450px;
  width:100%;
  margin:0 auto;
  display: flex;
  justify-content:space-between;
  padding:14px 12px;
`;
const Iconsli = styled.li`
  display: flex;
  flex-direction:column;
  align-items:center;
`;
const IconImg = styled.button`
  width:24px;
  height:24px;
  margin-bottom:3px;
  background:url(${props => props.icon}) center/24px 24px;
  border:0;

`;
const IconSpan = styled.span`
  font-size:10px;
`;
function Nav(){
  const navigate = useNavigate()
  const homeMatch = useMatch('/')
  const dmMatch = useMatch('/dm')
  const profileMatch = useMatch('/profile')
  const postUploadMatch = useMatch('/postupload')
  return(
    <NavContainer>
      {/* <IrH2></IrH2> */}
      <IconsUl>
        <Iconsli onClick={() => navigate('/')} >
          <IconImg icon={
            homeMatch 
            ? homeFill 
            : home
              } />
          <IconSpan>홈</IconSpan>
        </Iconsli>
        <Iconsli onClick={() => navigate('/dm')}>
          <IconImg icon={ 
            dmMatch 
            ? messageFill
            : message
          } />
          <IconSpan>채팅</IconSpan>
        </Iconsli>
        
        <Iconsli onClick={() => navigate('/postupload')}>
          <IconImg icon={
            postUploadMatch
            ? editFill
            : edit
          }  />
          <IconSpan>게시물 작성</IconSpan>
        </Iconsli>
        <Iconsli 
        onClick={() => navigate('/profile')}
        >
          <IconImg icon={
            profileMatch
            ? userFill
            : user
          } />
          <IconSpan>프로필</IconSpan>
        </Iconsli>
      </IconsUl>
    </NavContainer>
  )
}

export default Nav