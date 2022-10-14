import styled from "styled-components"
import Header from "../../common/Header"
import { MainContainer } from "../../common/MainContainer"
import userImg from '../../assets/user-profile.png'
import PostList from "../Post/PostList";
import { useNavigate } from "react-router-dom";
import Nav from "../../common/Nav";
import { signOut } from 'firebase/auth';
import { auth } from "../../firebase";
import { useSelector } from "react-redux";

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
  const userInfo = useSelector(state => state.user.currentUser)
  console.log(userInfo.photoURL,'oh')
  return(
    <>
      <Header prv={true} vertical={true} />
      <MainContainer>
        <ProfileContainer>
          <UserProfileImg src={ userInfo.photoURL || userImg} />
          <UserName>{userInfo.displayName}</UserName>
          <UserIntroduce>{userInfo.introduce} </UserIntroduce>
          <UserProfileEditBtn
          onClick={() => navigate('editprofile')}
          >프로필 수정하기</UserProfileEditBtn>
          <button onClick={() => {
            signOut(auth)
          }}>로그아웃</button>
        </ProfileContainer>
        <MyPost>나의 게시물</MyPost>
        <MyPostUl>
          <PostList />
        </MyPostUl>
      </MainContainer>
      <Nav />
    </>
  )
}

export default ProfilePage