import styled from "styled-components"
import Header from "../../common/Header"
import { MainContainer } from "../../common/MainContainer"
import userImg from '../../assets/user-profile.png'
import PostList from "../Post/PostList";
import { useNavigate } from "react-router-dom";
import Nav from "../../common/Nav";
import { signOut } from 'firebase/auth';
import { auth, db } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { collection,  onSnapshot, orderBy, query, where } from "firebase/firestore";
import { clearUser } from "../../redux/actions/user_action";

const ProfileContainer = styled.div`
  width:100%;
  margin-top:20px;
  display: flex;
  flex-direction:column;
  align-items:center;
  gap:20px;
  padding-bottom:20px;
  border-bottom:1px solid #DBDBDB;
`;

const UserProfileImg = styled.img`
  width:110px;
  height:110px;
  border-radius:50%;
`;
const UserProfileEditBtn = styled.button`
  border: 1px solid #DBDBDB;
  padding:5px 10px;
  border-radius:22px;
  width:120px;
`;
const UserName = styled.strong`
  font-weight:700;
  font-size:16px;
`;
const UserIntroduce = styled.p`
  width:250px;
  text-align:center;
`;
const MyPost = styled.p`
  margin-top:20px;
  text-align:center;
`;
const MyPostUl = styled.ul`
  margin-top:10px;
`;
function ProfilePage(){
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.user.currentUser)
  const [myPost,setMyPost] = useState([])
  const getMyPost = async () => {
    const postsRef = collection(db,'posts')
    const q = query(postsRef,where('writerId','==',userInfo.uid),orderBy('CreateAt','desc')) 
    const posts = onSnapshot(q,snapshot => {
      const newArr = snapshot.docs.map(doc => {
      return doc.data() 
      })
      setMyPost(newArr)
    })
  }
  const signOutUser = () => {
    signOut(auth)
    dispatch(clearUser())
  }
  useEffect(() => {
    getMyPost()
  },[])
  return(
    <>
      <Header prv={true}/>
      <MainContainer>
        <ProfileContainer>
          <UserProfileImg src={ userInfo.photoURL || userImg} />
          <UserName>{userInfo.displayName}</UserName>
          <UserIntroduce>{userInfo.introduce} </UserIntroduce>
          <UserProfileEditBtn
          onClick={() => navigate('editprofile')}
          >프로필 수정하기</UserProfileEditBtn>
          <button onClick={signOutUser}>로그아웃</button>
        </ProfileContainer>
        <MyPost>나의 게시물</MyPost>
        <MyPostUl>
          {
            myPost.map(post => <PostList key={post.postkey} {...post} />)
          }
        </MyPostUl>
      </MainContainer>
      <Nav />
    </>
  )
}

export default ProfilePage