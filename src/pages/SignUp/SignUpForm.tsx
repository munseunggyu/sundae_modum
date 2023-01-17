import { FirebaseError } from "@firebase/util";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { ISign } from "../../types/sign";
import * as S from "./style";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

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
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 다릅니다."),
});

function SignUpForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<ISign>({
    resolver: yupResolver(formSchema),
  });

  const handleSignUp = async ({ email, password }: ISign) => {
    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          alert("이미 가입된 이메일 입니다.");
        }
      }
      setLoading(false);
    }
  };
  return (
    <S.SignFormContainer onSubmit={handleSubmit(handleSignUp)}>
      <S.SignLabel htmlFor="user-email">이메일</S.SignLabel>
      <S.SignInput
        type="email"
        id="user-email"
        placeholder="이메일을 입력하세요."
        {...register("email")}
      />
      {errors.email && (
        <S.ErrorMessageP>{errors.email?.message}</S.ErrorMessageP>
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
      <S.SignLabel htmlFor="user-pw-confirm">비밀번호 확인</S.SignLabel>
      <S.SignInput
        type="password"
        id="user-pw-confirm"
        placeholder="비밀번호를 입력하세요."
        {...register("passwordConfirm")}
      />
      {errors.passwordConfirm && (
        <S.ErrorMessageP>{errors.passwordConfirm?.message}</S.ErrorMessageP>
      )}
      <S.SignSubmitBtn type="submit" value="회원가입" disabled={loading} />
      <Link to="/emaillogin">이미 아이디가 있다면...</Link>
    </S.SignFormContainer>
  );
}

export default SignUpForm;
