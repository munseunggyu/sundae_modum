import { Route, Routes } from "react-router-dom";
import DMPage from "./components/DM/DMRoomLists";
import HomePage from "./components/Home";
import SNSLoginPage from "./components/SNSLogin";
import RegisterPage from "./components/Register";
import EmailLoginPage from "./components/EmailLogin";
import ProfilePage from "./components/Profile";
import PostUploadPage from "./components/Post/PostUpload";
import DMDetailPage from "./components/DM/DMDetail";
import PostDetailPage from "./components/Post/PostDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage /> } />
      <Route path="/postupload" element={<PostUploadPage /> } />
      <Route path="/postdetail/:id" element={<PostDetailPage /> } />
      <Route path="/dm" element={<DMPage /> } />
      <Route path="/dm/:id" element={<DMDetailPage />} />
      <Route path="/snslogin" element={<SNSLoginPage /> } />
      <Route path="/register" element={<RegisterPage/> } />
      <Route path="/emaillogin" element={<EmailLoginPage /> } />
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
}

export default App;
