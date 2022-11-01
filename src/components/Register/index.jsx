import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import arrowLeft from '../../assets/arrow-left.png'
import { auth } from "../../firebase";
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
  opacity: ${props => props.disabled ? '0.5' : '1'};
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
export const ErrorMessageP = styled.p`
  font-size:10px;
  font-weight:300;
  margin-top:5px;
  margin-right:auto;
`;
function RegisterPage(){
  const navigate = useNavigate()
  // 계정 생성 시 firebase에서 계정 생성될때 까지 submit버튼 비활성화
  const [loding,setLoding] = useState(false) 
  const {register,watch,formState:{errors},handleSubmit} = useForm()
  const password = useRef()
  password.current = watch('password')
  
  const Register = async ({email,password}) => {
    try{
      setLoding(true)
      await createUserWithEmailAndPassword(auth,email,password)  
      setLoding(false)
    }catch(error){
      if(error.code === 'auth/email-already-in-use'){
        alert('이미 가입된 이메일 입니다.')
      }
      setLoding(false)
    }
  }
  return(
    <SignContainer>
      <SignH1>회원가입</SignH1>
      <PrevPage onClick={()=>navigate('/')}></PrevPage>
      <SignFormContainer 
      onSubmit={handleSubmit(Register)}
      >
        <SignLabel htmlFor='user-email'>
          이메일
        </SignLabel>
        <SignInput 
          type="email" 
          name='email'
          id="user-email" 
          placeholder="이메일을 입력하세요."
          {...register("email",{required:true,pattern:/^\S+@\S+$/i })}
          />
          {errors.email && <ErrorMessageP>이메일 형식에 맞게 작성해 주세요.</ErrorMessageP>}
          <SignLabel htmlFor='user-pw'>
          비밀번호
        </SignLabel>
        <SignInput 
          type="password" 
          name='password'
          id="user-pw" 
          placeholder="비밀번호를 입력하세요."
          {...register("password", { required: true,minLength:6 })}
          />
          {errors.password && <ErrorMessageP>최소 6자 이상 입력해주세요.</ErrorMessageP>}
          <SignLabel htmlFor='user-pw-confirm'>
          비밀번호 확인
        </SignLabel>
        <SignInput 
          type="password" 
          name='passwordConfirm'
          id="user-pw-confirm" 
          placeholder="비밀번호를 입력하세요."
          {...register('passwordConfirm',{required:true,validate:(value) => value === password.current})}
          />
          {errors.password_confirm && <ErrorMessageP>위 비밀번호와 일치하게 입력해주세요.</ErrorMessageP>}
          <SignSubmitBtn type="submit" value='회원가입' disabled={loding} />
          <Link to='/emaillogin'>이미 아이디가 있다면...</Link>
      </SignFormContainer>
    </SignContainer>
  )
}

export default RegisterPage