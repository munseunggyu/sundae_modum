import { Link, useNavigate } from "react-router-dom"
import { PrevPage, SignContainer, SignFormContainer, SignH1, SignInput, SignLabel, SignSubmitBtn } from "../Register"

function EmailLoginPage(){
  const navigate = useNavigate()
  return(
    <SignContainer>
    <SignH1>로그인</SignH1>
    <PrevPage onClick={()=>navigate('/snslogin')}></PrevPage>
    <SignFormContainer >
      <SignLabel htmlFor='user-email'>
        이메일
      </SignLabel>
      <SignInput 
        type="email" 
        id="user-email" 
        placeholder="이메일을 입력하세요."
        />
        <SignLabel htmlFor='user-pw'>
        비밀번호
      </SignLabel>
      <SignInput 
        type="password" 
        id="user-pw" 
        placeholder="비밀번호를 입력하세요."
        />
        <SignSubmitBtn type="submit" value='로그인' />
        <Link to='/register'>아이디가 없다면...</Link>
    </SignFormContainer>
  </SignContainer>
  )
}

export default EmailLoginPage