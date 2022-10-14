import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../firebase";
import { ErrorMessageP, PrevPage, SignContainer, SignFormContainer, SignH1, SignInput, SignLabel, SignSubmitBtn } from "../Register"

function EmailLoginPage(){
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const [errorMessage,setErrorMessage] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm()
  const onSignIn = async ({email,password}) => {
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth,email, password);
      setLoading(false)
      console.log('로그인 완료')
      navigate('/')
    } catch (error) {
      setErrorMessage(error.code)
      setLoading(false)
    }
  }
  return(
    <SignContainer>
    <SignH1>로그인</SignH1>
    <PrevPage onClick={()=>navigate('/snslogin')}></PrevPage>
    <SignFormContainer
      onSubmit={handleSubmit(onSignIn)}
    >
      <SignLabel htmlFor='user-email'>
        이메일
      </SignLabel>
      <SignInput 
        type="email" 
        name="email"
        id="user-email" 
        placeholder="이메일을 입력하세요."
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errorMessage === 'auth/user-not-found' && <ErrorMessageP>아이디가 없습니다.</ErrorMessageP>}

        <SignLabel htmlFor='user-pw'>
        비밀번호
      </SignLabel>
      <SignInput 
        type="password" 
        name="password"
        id="user-pw" 
        placeholder="비밀번호를 입력하세요."
        {...register("password", { required: true })}
        />
        {errorMessage === 'auth/wrong-password' && <ErrorMessageP>비밀번호가 틀렸습니다.</ErrorMessageP>}
        <SignSubmitBtn type="submit" value='로그인' disabled={loading} />
        <Link to='/register'>아이디가 없다면...</Link>
    </SignFormContainer>
  </SignContainer>
  )
}

export default EmailLoginPage