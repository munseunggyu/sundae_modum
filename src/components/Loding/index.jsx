import { useState } from 'react';
import logo from '../../assets/logo.png';
import { LodingConatiner, LogoImg } from './style';

function LodingPage() {
  const [isLoad, setIsLoad] = useState('flex');
  const hi = () => {
    setTimeout(() => {
      setIsLoad('none');
    }, 1500);
  };
  hi();
  return (
    <LodingConatiner isLoad={isLoad}>
      <LogoImg src={logo} alt="" />
    </LodingConatiner>
  );
}

export default LodingPage;
