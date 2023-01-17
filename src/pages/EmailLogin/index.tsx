import { FirebaseError } from "@firebase/util";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { ISign } from "../../types/sign";
import * as S from "../SignUp/style";

const formSchema = yup.object({
  email: yup
    .string()
    .required("이메일을 입력해주세요.")
    .email("이메일 형식이 아닙니다."),
  password: yup
    .string()
    .required("최소 6자 이상 가능합니다.")
    .min(6, "최소 6자 이상 가능합니다.")
    .max(15, "최대 15자 까지만 가능합니다."),
});

function EmailLoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISign>({
    resolver: yupResolver(formSchema),
  });
  const onSignIn = async ({ email, password }: ISign) => {
    try {
      setLoading(true);
      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        setErrorMessage(error.code);
      }
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
          id="user-email"
          placeholder="이메일을 입력하세요."
          {...register("email")}
        />
        {errorMessage === "auth/user-not-found" && (
          <S.ErrorMessageP>아이디가 없습니다.</S.ErrorMessageP>
        )}

        <S.SignLabel htmlFor="user-pw">비밀번호</S.SignLabel>
        <S.SignInput
          type="password"
          id="user-pw"
          placeholder="비밀번호를 입력하세요."
          {...register("password")}
        />
        {errors.password && (
          <S.ErrorMessageP>{errors.password?.message}</S.ErrorMessageP>
        )}
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
