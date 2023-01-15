import { Route, Routes } from "react-router-dom";
import DMPage from "./pages/DM/DMRoomLists";
import HomePage from "./pages/Home";
import EmailLoginPage from "./pages/EmailLogin";
import ProfilePage from "./pages/Profile";
import PostUploadPage from "./pages/Post/PostUpload";
import DMDetailPage from "./pages/DM/DMDetail";
import PostDetailPage from "./pages/Post/PostDetail";
import EditProfile from "./pages/Profile/EditProfile";
import { useContext } from "react";
import SNSLoginPage from "./pages/SNSLogin";
import SignUpPage from "./pages/SignUp";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { state } = useAuthContext();
  return (
    <Routes>
      {state.isLoading ? (
        <>
          <Route path="/" element={<SNSLoginPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/emaillogin" element={<EmailLoginPage />} />
          <Route path="/firstedit" element={<EditProfile isFirst={true} />} />
        </>
      ) : state.currentUser ? (
        <>
          <Route path="/" element={<HomePage />} />
          <Route path="/postupload" element={<PostUploadPage />} />
          <Route path="/postdetail/:id" element={<PostDetailPage />} />
          <Route path="/dm" element={<DMPage />} />
          <Route path="/dm/:id" element={<DMDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route
            path="/profile/editprofile"
            element={<EditProfile isFirst={false} />}
          />
        </>
      ) : (
        <Route path="/" element={<>...loding</>} />
      )}
    </Routes>
  );
}

export default App;
