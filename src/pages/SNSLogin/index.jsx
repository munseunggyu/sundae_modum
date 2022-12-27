import logo from "../../assets/logo.png";
import kakaologo from "../../assets/kakaologo.png";
import googlelogo from "../../assets/googlelogo.png";
import facebooklogo from "../../assets/facebooklogo.png";
import { Link } from "react-router-dom";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "../../firebase";
import LodingPage from "../Splash";
import * as S from "./style";

function SNSLoginPage() {
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const onSocialLogin = async (e) => {
    try {
      const {
        target: { name },
      } = e;
      if (name === "google") {
        await signInWithRedirect(auth, googleProvider);
      } else if (name === "facebook") {
        await signInWithRedirect(auth, facebookProvider);
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <S.SNSLoginContainer>
        <h1 className="ir">SNS 로그인 페이지</h1>
        <S.LogoContainer>
          <S.LogoImg src={logo} alt="순대 모둠 로고" />
        </S.LogoContainer>
        <S.LoginBtnContainer>
          <S.LoginBtns>
            <li>
              <S.SNSBtn
                btnColor="#F1C94B"
                logoImg={kakaologo}
                name="kakao"
                onClick={onSocialLogin}
              >
                카카오 계정으로 로그인
              </S.SNSBtn>
            </li>
            <li>
              <S.SNSBtn
                logoImg={googlelogo}
                name="google"
                onClick={onSocialLogin}
              >
                구글 계정으로 로그인
              </S.SNSBtn>
            </li>
            <li>
              <S.SNSBtn
                btnColor="#2C9CDB"
                logoImg={facebooklogo}
                name="facebook"
                onClick={onSocialLogin}
              >
                페이스북 계정으로 로그인
              </S.SNSBtn>
            </li>
          </S.LoginBtns>
          <S.EmailRegisterContainer>
            <Link to="/emaillogin">이메일 로그인</Link>
            <Link to="/register">회원가입</Link>
          </S.EmailRegisterContainer>
        </S.LoginBtnContainer>
      </S.SNSLoginContainer>
      <LodingPage />
    </>
  );
}

export default SNSLoginPage;
