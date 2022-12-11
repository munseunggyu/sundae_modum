import { useState } from 'react';
import logo from '../../assets/logo.png';
import { LodingConatiner, LogoImg } from './style';

function Splash() {
  const [isLoad, setIsLoad] = useState('flex');
  const splashStart = () => {
    setTimeout(() => {
      setIsLoad('none');
    }, 1500);
  };
  splashStart();
  return (
    <LodingConatiner isLoad={isLoad}>
      <LogoImg src={logo} alt="" />
    </LodingConatiner>
  );
}

export default Splash;
