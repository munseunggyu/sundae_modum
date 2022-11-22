import { useState } from 'react';
import logo from '../../assets/logo.png';
import { LodingConatiner, LogoImg } from './style';

function LodingPage() {
    const [display, setDisplay] = useState('flex');
    const hi = () => {
        setTimeout(() => {
            setDisplay('none');
        }, 1500);
    };
    hi();
    return (
        <LodingConatiner display={display}>
            <LogoImg src={logo} alt="" />
        </LodingConatiner>
    );
}

export default LodingPage;
