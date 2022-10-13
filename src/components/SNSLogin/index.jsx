import styled from "styled-components"
import { IrH1 } from "../../common/TextHide";
import logo from '../../assets/logo.png'
import kakaologo from '../../assets/kakaologo.png'
import googlelogo from '../../assets/googlelogo.png'
import facebooklogo from '../../assets/facebooklogo.png'
import { Link } from "react-router-dom";
import { FacebookAuthProvider, getRedirectResult, GoogleAuthProvider, signInWithPopup, signInWithRedirect, signOut } from "firebase/auth";
import { auth} from "../../firebase";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTest } from "../../redux/actions/user_action";
const SNSLoginContainer= styled.article`
  width:100%;
`;
const LogoContainer = styled.div`
  background-color:${props => props.theme.mainColor};
  width:100%;
  height:50vh;
  display: flex;
  align-items:center;
  justify-content:center;
`;
const LogoImg = styled.img`
  width:9rem;
  height:9rem;
  border-radius:10%;
`;
const LoginBtnContainer = styled.div`
  width:100%;
  background-color:white;
  padding:5rem;
  top:-1.25rem;
  position:relative;
  border-radius: 20px 20px 0px 0px;

`;
const LoginBtns = styled.ul`
  display: flex;
  flex-direction:column;
  align-items:center;
  gap:10px;
  margin-top:20px;
`;

const SNSBtn = styled.button`
  padding:13px 15px;
  width:17rem;
  border-radius:44px;
  outline:none;
  border:0;
  position:relative;
  background-color:transparent;
  border: 1px solid ${props =>  props.color || 'black'};
  img{
    position:absolute;
    left:14px;
    top:11px;
  }
  &::before{
    content: "";
    width: 24px;
    height: 24px;
    background: ${props => `url(${props.logoImg})`} no-repeat;
    position: absolute;
    top: 11px;
    left: 14px;
  }
`;
const EmailRegisterContainer = styled.div`
  margin-top:20px;
  text-align:center;
  a{
    color:#808080;
    position:relative;
    &:first-child{
      margin-right:12px;
    }
    &:first-child::after{
      top: 1px;
      content: "";
      width: 1px;
      height: 15px;
      background-color: rgb(196, 196, 196);
      position: absolute;
      margin-left: 6px;
    }
  }
`;

function SNSLoginPage(){
  const [errorMessage,setErrorMessage] = useState('')
  const googleProvider = new GoogleAuthProvider()
  const facebookProvider = new FacebookAuthProvider()
  const dispatch = useDispatch()
  const hi = useSelector(state => state.test)
  const [gl,setGl] = useState('')
  const onSocialLogin = async (e) => {
   try{
    const {target:{name}} = e
    if(name === 'google'){
      await signInWithRedirect(auth,googleProvider)
    }else if(name === 'facebook'){
      await signInWithRedirect(auth, facebookProvider);
    }else{
    }
   }
   catch(error){
    console.log(error)
  }

  }
  return(
    <SNSLoginContainer>
      <IrH1>SNS 로그인 페이지</IrH1>
      <LogoContainer>
        <LogoImg src={logo} alt="순대 모둠 로고" />
      </LogoContainer>
      <LoginBtnContainer>
        <LoginBtns>
          <li>
            <SNSBtn 
            color="#F1C94B" 
            logoImg={kakaologo}
            name='kakao'
            onClick={onSocialLogin}
            >
              카카오 계정으로 로그인
            </SNSBtn>
            </li>
          <li>
            <SNSBtn 
            logoImg={googlelogo}
            name = 'google'
            onClick={onSocialLogin}
            >
              구글 계정으로 로그인
            </SNSBtn>
            </li>
          <li>
            <SNSBtn 
            color="#2C9CDB" 
            logoImg={facebooklogo}
            name='facebook'
            onClick={onSocialLogin}
            >
              페이스북 계정으로 로그인
            </SNSBtn>
            </li>
        </LoginBtns>
        <EmailRegisterContainer>
          <Link to='/emaillogin'>이메일 로그인</Link>
          <Link to='/register'>회원가입</Link>
          <button onClick={() => {
            signOut(auth)
            console.log('로그아웃')
          }}>로그아웃</button>
        </EmailRegisterContainer>
      </LoginBtnContainer>
    </SNSLoginContainer>
  )
}

export default SNSLoginPage