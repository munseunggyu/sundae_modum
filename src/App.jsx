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

function App() {
  const [loding,setLoding] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth,user => {
      if(user){
        setLoding(true)
        navigate('/')
        console.log(loding)
      }else{
        navigate('/')
        setLoding(false)
        console.log(loding)
      }
    })
  },[])
  return (
    <Routes>
      {
        loding
        ?  (
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
        : (
          <>
            <Route path="/" element={<SNSLoginPage /> } />
            <Route path="/register" element={<RegisterPage/> } />
            <Route path="/emaillogin" element={<EmailLoginPage /> } />
          </>
        )
      }
    </Routes>
  );
}

export default App;
