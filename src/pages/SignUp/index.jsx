import { useNavigate } from "react-router-dom";
import SignUpForm from "./SignUpForm";
import * as S from "./style";

function SignUpPage() {
  const navigate = useNavigate();

  return (
    <S.SignContainer>
      <S.SignH1>회원가입</S.SignH1>
      <S.PrevPage onClick={() => navigate("/")}></S.PrevPage>
      <SignUpForm />
    </S.SignContainer>
  );
}

export default SignUpPage;
