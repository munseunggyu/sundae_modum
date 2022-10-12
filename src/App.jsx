import { Route, Routes, useNavigate } from "react-router-dom";
import DMPage from "./components/DM/DMRoomLists";
import HomePage from "./components/Home";
import SNSLoginPage from "./components/SNSLogin";
import RegisterPage from "./components/Register";
import EmailLoginPage from "./components/EmailLogin";
import ProfilePage from "./components/Profile";
import PostUploadPage from "./components/Post/PostUpload";
import DMDetailPage from "./components/DM/DMDetail";
import PostDetailPage from "./components/Post/PostDetail";
import EditProfile from "./components/Profile/EditProfile";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/actions/user_action";

function App() {
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user)
  const navigate = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth,user => {
      if(user){
        dispatch(setUser(user))
        navigate('/')
      }else{
        navigate('/')
      }
    })
  },[])
  return (
    <Routes>
      {
        userInfo.isLoading
        ?  (
          <>
            <Route path="/" element={<SNSLoginPage /> } />
            <Route path="/register" element={<RegisterPage/> } />
            <Route path="/emaillogin" element={<EmailLoginPage /> } />
            <Route path="/" element={<HomePage /> } />
        </>
        )
        : (
          <>
            <Route path="/" element={<HomePage /> } />
            <Route path="/postupload" element={<PostUploadPage /> } />
            <Route path="/postdetail/:id" element={<PostDetailPage /> } />
            <Route path="/dm" element={<DMPage /> } />
            <Route path="/dm/:id" element={<DMDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/editprofile" element={<EditProfile /> } />
          </>
        )
      }
    </Routes>
  );
}

export default App;
