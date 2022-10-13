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
import { auth, db } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./redux/actions/user_action";
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc, where } from "firebase/firestore"
import { async } from "@firebase/util";

function App() {
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user)
  const navigate = useNavigate()
  const [users,setUsers] = useState([])

//   const getUsers = async (user) => {
//   const userDB = query(collection(db,'users'),orderBy('email','desc'))
//   if(!userDB) return
//   onSnapshot(userDB,snapshot => {
//     let newa = snapshot.docs.map(doc => doc.data())
//     console.log(newa)
//     setUsers(prev => {
//       return newa.filter(data => data.uid === user.uid) 
//     })
//   }
//   )
// }
  useEffect(() => {
    onAuthStateChanged(auth,(user) =>  {
      if(user){
        // getUsers(user).then(() => dispatch(setUser(...users)))
        onSnapshot(doc(db, "users", user.uid), (doc) => {
          dispatch(setUser(doc.data()))
        })
        // dispatch(setUser(user))
        navigate('/')
      }else{
        navigate('/')
      }
    })
  },[])
  console.log(userInfo)
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
        : userInfo.currentUser

        ? (
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
        : <>...loding</>
      }
      
    </Routes>
  );
}

export default App;
