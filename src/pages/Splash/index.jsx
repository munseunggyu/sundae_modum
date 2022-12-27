import { useState } from "react";
import logo from "../../assets/logo.png";
import * as S from "./style";

function Splash() {
  const [isLoad, setIsLoad] = useState("flex");
  const splashStart = () => {
    setTimeout(() => {
      setIsLoad("none");
    }, 1500);
  };
  splashStart();
  return (
    <S.LodingConatiner isLoad={isLoad}>
      <S.LogoImg src={logo} alt="" />
    </S.LodingConatiner>
  );
}

export default Splash;
