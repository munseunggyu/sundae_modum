import { Route, Routes, useNavigate } from 'react-router-dom';
import DMPage from './components/DM/DMRoomLists';
import HomePage from './components/Home';
import SNSLoginPage from './components/SNSLogin';
import RegisterPage from './components/Register';
import EmailLoginPage from './components/EmailLogin';
import ProfilePage from './components/Profile';
import PostUploadPage from './components/Post/PostUpload';
import DMDetailPage from './components/DM/DMDetail';
import PostDetailPage from './components/Post/PostDetail';
import EditProfile from './components/Profile/EditProfile';
import { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { firstSetUser, setUser } from './redux/actions/user_action';
import { onSnapshot, doc } from 'firebase/firestore';
import FirstProfilePage from './components/Profile/FristProfile';

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    // 로그인,회원가입,소셜로그인 시 firestore에 해당 유저가 있는지 확인
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // dispatch(setUser(user))
        onSnapshot(doc(db, 'users', user.uid), async (doc) => {
          // 만약 없다면 첫 프로필 설정 화면으로 이동
          if (!doc.data()) {
            dispatch(firstSetUser(user));
            navigate('/editsns');
            return;
          }
          // 있다면 바로 홈으로 이동
          dispatch(setUser(doc.data()));
          // navigate('/')
        });
      } else {
        navigate('/');
      }
    });
  }, []);
  return (
    <Routes>
      {userInfo.isLoading ? (
        <>
          <Route path="/" element={<SNSLoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/emaillogin" element={<EmailLoginPage />} />
          <Route path="/editsns" element={<FirstProfilePage />} />
        </>
      ) : userInfo.currentUser ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/postupload" element={<PostUploadPage />} />
          <Route path="/postdetail/:id" element={<PostDetailPage />} />
          <Route path="/dm" element={<DMPage />} />
          <Route path="/dm/:id" element={<DMDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/editprofile" element={<EditProfile />} />
        </>
      ) : (
        <Route path="/" element={<>...loding</>} />
      )}
    </Routes>
  );
}

export default App;
