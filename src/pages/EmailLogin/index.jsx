import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import * as S from "../SignUp/style";

function EmailLoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSignIn = async ({ email, password }) => {
    try {
      setLoading(true);
      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.code);
      setLoading(false);
    }
  };
  return (
    <S.SignContainer>
      <S.SignH1>로그인</S.SignH1>
      <S.PrevPage onClick={() => navigate("/")}></S.PrevPage>
      <S.SignFormContainer onSubmit={handleSubmit(onSignIn)}>
        <S.SignLabel htmlFor="user-email">이메일</S.SignLabel>
        <S.SignInput
          type="email"
          name="email"
          id="user-email"
          placeholder="이메일을 입력하세요."
          {...register("email", {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
        />
        {errorMessage === "auth/user-not-found" && (
          <S.ErrorMessageP>아이디가 없습니다.</S.ErrorMessageP>
        )}

        <S.SignLabel htmlFor="user-pw">비밀번호</S.SignLabel>
        <S.SignInput
          type="password"
          name="password"
          id="user-pw"
          placeholder="비밀번호를 입력하세요."
          {...register("password", { required: true })}
        />
        {errorMessage === "auth/wrong-password" && (
          <S.ErrorMessageP>비밀번호가 틀렸습니다.</S.ErrorMessageP>
        )}
        <S.SignSubmitBtn type="submit" value="로그인" disabled={loading} />
        <Link to="/register">아이디가 없다면...</Link>
      </S.SignFormContainer>
    </S.SignContainer>
  );
}

export default EmailLoginPage;
