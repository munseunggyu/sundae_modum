import { useNavigate } from 'react-router-dom';
import SignUpForm from './SignUpForm';
import { PrevPage, SignContainer, SignH1 } from './style';

function SignUpPage() {
  const navigate = useNavigate();

  return (
    <SignContainer>
      <SignH1>회원가입</SignH1>
      <PrevPage onClick={() => navigate('/')}></PrevPage>
      <SignUpForm />
    </SignContainer>
  );
}

export default SignUpPage;
