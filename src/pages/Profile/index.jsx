import Header from "../../components/Header";
import { MainContainer } from "../../components/MainContainer";
import userImg from "../../assets/user-profile.png";
import PostList from "../Post/PostList";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { clearUser } from "../../redux/actions/user_action";
import {
  MyPost,
  MyPostUl,
  ProfileContainer,
  UserIntroduce,
  UserName,
  UserProfileEditBtn,
  UserProfileImg,
} from "./style";
import useCollection from "../../hooks/useCollection";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.currentUser);
  const { documents, getDocuments } = useCollection(false, true);

  const signOutUser = () => {
    signOut(auth);
    dispatch(clearUser());
  };
  useEffect(() => {
    getDocuments("posts", "writerId", userInfo.uid, "==");
  }, []);
  return (
    <>
      <Header ir="프로필 페이지" prv={true} />
      <MainContainer>
        <ProfileContainer>
          <h2 className="ir">프로필 정보 및 수정</h2>
          <UserProfileImg
            src={userInfo.photoURL || userImg}
            alt="유저 프로필 이미지"
          />
          <UserName>{userInfo.displayName}</UserName>
          <UserIntroduce>{userInfo.introduce} </UserIntroduce>
          <UserProfileEditBtn onClick={() => navigate("editprofile")}>
            프로필 수정하기
          </UserProfileEditBtn>
          <button onClick={signOutUser}>로그아웃</button>
        </ProfileContainer>
        <MyPost>나의 게시물</MyPost>
        <MyPostUl>
          {documents.map((post) => (
            <PostList key={post.postkey} {...post} />
          ))}
        </MyPostUl>
      </MainContainer>
      <Nav />
    </>
  );
}

export default ProfilePage;
