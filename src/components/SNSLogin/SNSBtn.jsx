import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import { auth } from '../../firebase';
import { SNSBtnEl } from './style';

function SNSBtn({ btnColor, logoImg, name, children }) {
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const onSocialLogin = async (e) => {
    try {
      const {
        target: { name },
      } = e;
      if (name === 'google') {
        await signInWithRedirect(auth, googleProvider);
      } else if (name === 'facebook') {
        await signInWithRedirect(auth, facebookProvider);
      } else {
        alert(
          `카카오 로그인은 준비중입니다. 구글 로그인이나 페이스북 로그인을 사용해주세요.`
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SNSBtnEl
      btnColor={btnColor}
      logoImg={logoImg}
      name={name}
      onClick={onSocialLogin}
    >
      {children}
    </SNSBtnEl>
  );
}

export default SNSBtn;
