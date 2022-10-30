import { useState } from 'react';
import logo from '../../assets/logo.png'
import styled, { keyframes } from 'styled-components';

const fadeInOut = keyframes`
0% {
  opacity: 0;
  transform: translateY(80px);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
`;

const LodingConatiner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color:${props => props.theme.mainColor};
  display: ${props => props.display};
  justify-content: center;
  align-items: center;
  z-index: 20;
  img {
    animation: ${fadeInOut} 0.5s linear forwards;
  }
`;
const LogoImg = styled.img`
  width:200px;
  height:200px;
  border-radius:10px;
`;


function LodingPage(){
  const [display, setDisplay] = useState('flex');
  const hi = () => {
    setTimeout(() => {
      setDisplay('none');
    }, 1500);
  }
  hi()
  return(
    <LodingConatiner display={display}>
      <LogoImg src={logo} alt="" />
    </LodingConatiner>
  )
}

export default LodingPage