import { IrH1 } from '../../common/TextHide';
import logo from '../../assets/logo.png';
import kakaologo from '../../assets/kakaologo.png';
import googlelogo from '../../assets/googlelogo.png';
import facebooklogo from '../../assets/facebooklogo.png';
import { Link } from 'react-router-dom';
import {
  EmailRegisterContainer,
  LoginBtnContainer,
  LoginBtns,
  LogoContainer,
  LogoImg,
  SNSLoginContainer,
} from './style';
import LodingPage from '../../components/Loding';
import SNSBtn from '../../components/SNSLogin/\bSNSBtn';

function SNSLoginPage() {
  return (
    <>
      <SNSLoginContainer>
        <IrH1>SNS 로그인 페이지</IrH1>
        <LogoContainer>
          <LogoImg src={logo} alt="순대 모둠 로고" />
        </LogoContainer>
        <LoginBtnContainer>
          <LoginBtns>
            <li>
              <SNSBtn btnColor="#F1C94B" logoImg={kakaologo} name="kakao">
                카카오 계정으로 로그인
              </SNSBtn>
            </li>
            <li>
              <SNSBtn btnColor="black" logoImg={googlelogo} name="google">
                구글 계정으로 로그인
              </SNSBtn>
            </li>
            <li>
              <SNSBtn btnColor="#2C9CDB" logoImg={facebooklogo} name="facebook">
                페이스북 계정으로 로그인
              </SNSBtn>
            </li>
          </LoginBtns>
          <EmailRegisterContainer>
            <Link to="/emaillogin">이메일 로그인</Link>
            <Link to="/register">회원가입</Link>
          </EmailRegisterContainer>
        </LoginBtnContainer>
      </SNSLoginContainer>
      <LodingPage />
    </>
  );
}

export default SNSLoginPage;
