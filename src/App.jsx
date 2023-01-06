import { Route, Routes, useNavigate } from "react-router-dom";
import DMPage from "./pages/DM/DMRoomLists";
import HomePage from "./pages/Home";
import EmailLoginPage from "./pages/EmailLogin";
import ProfilePage from "./pages/Profile";
import PostUploadPage from "./pages/Post/PostUpload";
import DMDetailPage from "./pages/DM/DMDetail";
import PostDetailPage from "./pages/Post/PostDetail";
import EditProfile from "./pages/Profile/EditProfile";
import { useEffect } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { firstSetUser, setUser } from "./redux/actions/user_action";
import { onSnapshot, doc } from "firebase/firestore";
import SNSLoginPage from "./pages/SNSLogin";
import SignUpPage from "./pages/SignUp";

function App() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        onSnapshot(doc(db, "users", user.uid), async (doc) => {
          if (!doc.data()) {
            dispatch(firstSetUser(user));
            navigate("/firstedit");
            return;
          }
          // 있다면 바로 홈으로 이동
          dispatch(setUser(doc.data()));
        });
      } else {
        navigate("/");
      }
    });
  }, []);
  return (
    <Routes>
      {userInfo.isLoading ? (
        <>
          <Route path="/" element={<SNSLoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/emaillogin" element={<EmailLoginPage />} />
          <Route path="/firstedit" element={<EditProfile isFrist={true} />} />
        </>
      ) : userInfo.currentUser ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/postupload" element={<PostUploadPage />} />
          <Route path="/postdetail/:id" element={<PostDetailPage />} />
          <Route path="/dm" element={<DMPage />} />
          <Route path="/dm/:id" element={<DMDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/profile/editprofile"
            element={<EditProfile isFrist={false} />}
          />
        </>
      ) : (
        <Route path="/" element={<>...loding</>} />
      )}
    </Routes>
  );
}

export default App;
