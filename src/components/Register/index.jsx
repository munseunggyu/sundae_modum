import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import arrowLeft from '../../assets/arrow-left.png'
export const SignContainer = styled.article`
  margin:78px auto 0;
  width:100%;
  max-width:450px;
  padding:20px; 
  position:relative;
`;
export const SignH1 = styled.h1`
  font-size:24px;
  text-align:center;
  margin-bottom:20px;
`;
export const SignFormContainer = styled.form`
  width:100%;
  margin-top:25px;
  a{
    display: block;
    text-align:center;
    margin-top:10px;
  }
`;
export const SignLabel = styled.label`
  display: block;
  margin:15px 0;
  font-size:14px;
`;
export const SignInput = styled.input`
  border:0;
  border-bottom:1px solid black;
  width:100%;
  outline:none;
  padding-bottom:5px;
  font-size:14px;
  margin-bottom:5px;
`;
export const SignSubmitBtn = styled.input`
  width:100%;
  border-radius:44px;
  padding:13px 0;
  font-size:18px;
  color:white;
  background-color:${props => props.theme.mainColor};
  margin-top:20px;
  border:0;
  cursor: pointer;
`;
export const PrevPage = styled.button`
  top:18px;
  position:absolute;
  border:0;
  background-color:transparent;
  &::before{
    content:'';
    background:url(${arrowLeft});
    width: 24px;
    height: 24px;
    position: absolute;
  }
`;
function RegisterPage(){
  const {register} = useForm()
  const navigate = useNavigate()
  return(
    <SignContainer>
      <SignH1>회원가입</SignH1>
      <PrevPage onClick={()=>navigate('/snslogin')}></PrevPage>
      <SignFormContainer >
        <SignLabel for='user-email'>
          이메일
        </SignLabel>
        <SignInput 
          type="email" 
          id="user-email" 
          placeholder="이메일을 입력하세요."
          />
          <SignLabel for='user-nickname'>
          닉네임
        </SignLabel>
        <SignInput 
          type="password" 
          id="user-nickname" 
          placeholder="닉네임을 입력하세요."
          />
          <SignLabel for='user-pw'>
          비밀번호
        </SignLabel>
        <SignInput 
          type="password" 
          id="user-pw" 
          placeholder="비밀번호를 입력하세요."
          />
           <SignLabel for='user-pw-confirm'>
          비밀번호 확인
        </SignLabel>
        <SignInput 
          type="password" 
          id="user-pw-confirm" 
          placeholder="비밀번호를 입력하세요."
          />
          <SignSubmitBtn type="submit" value='회원가입' />
          <Link to='/emaillogin'>이미 아이디가 있다면...</Link>
      </SignFormContainer>
    </SignContainer>
  )
}

export default RegisterPage