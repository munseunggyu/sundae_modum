import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import {
  ErrorMessageP,
  SignFormContainer,
  SignInput,
  SignLabel,
  SignSubmitBtn,
} from './style';

function SignUpForm() {
  // 계정 생성 시 firebase에서 계정 생성될때 까지 submit버튼 비활성화
  const [loding, setLoding] = useState(false);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const password = useRef();
  password.current = watch('password');

  const handleSignUp = async ({ email, password }) => {
    try {
      setLoding(true);
      await createUserWithEmailAndPassword(auth, email, password);
      setLoding(false);
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('이미 가입된 이메일 입니다.');
      }
      setLoding(false);
    }
  };
  return (
    <SignFormContainer onSubmit={handleSubmit(handleSignUp)}>
      <SignLabel htmlFor="user-email">이메일</SignLabel>
      <SignInput
        type="email"
        name="email"
        id="user-email"
        placeholder="이메일을 입력하세요."
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email && (
        <ErrorMessageP>이메일 형식에 맞게 작성해 주세요.</ErrorMessageP>
      )}
      <SignLabel htmlFor="user-pw">비밀번호</SignLabel>
      <SignInput
        type="password"
        name="password"
        id="user-pw"
        placeholder="비밀번호를 입력하세요."
        {...register('password', { required: true, minLength: 6 })}
      />
      {errors.password && (
        <ErrorMessageP>최소 6자 이상 입력해주세요.</ErrorMessageP>
      )}
      <SignLabel htmlFor="user-pw-confirm">비밀번호 확인</SignLabel>
      <SignInput
        type="password"
        name="passwordConfirm"
        id="user-pw-confirm"
        placeholder="비밀번호를 입력하세요."
        {...register('passwordConfirm', {
          required: true,
          validate: (value) => value === password.current,
        })}
      />
      {errors.password_confirm && (
        <ErrorMessageP>위 비밀번호와 일치하게 입력해주세요.</ErrorMessageP>
      )}
      <SignSubmitBtn type="submit" value="회원가입" disabled={loding} />
      <Link to="/emaillogin">이미 아이디가 있다면...</Link>
    </SignFormContainer>
  );
}

export default SignUpForm;
