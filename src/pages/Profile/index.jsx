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
import * as S from "./style";
import useCollection from "../../hooks/useCollection";
import PrevBtn from "../../components/Header/PrevBtn";

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.currentUser);
  const { documents: myPostsData, getDocuments: getMyPostsData } =
    useCollection(false, true);
  const signOutUser = () => {
    signOut(auth);
    dispatch(clearUser());
  };
  useEffect(() => {
    getMyPostsData("posts", "writerId", userInfo.uid, "==");
  }, []);
  return (
    <>
      <Header ir="프로필 페이지">
        <PrevBtn />
      </Header>
      <MainContainer>
        <S.ProfileContainer>
          <h2 className="ir">프로필 정보 및 수정</h2>
          <S.UserProfileImg
            src={userInfo.photoURL || userImg}
            alt="유저 프로필 이미지"
          />
          <S.UserName>{userInfo.displayName}</S.UserName>
          <S.UserIntroduce>{userInfo.introduce} </S.UserIntroduce>
          <S.UserProfileEditBtn onClick={() => navigate("editprofile")}>
            프로필 수정하기
          </S.UserProfileEditBtn>
          <button onClick={signOutUser}>로그아웃</button>
        </S.ProfileContainer>
        <S.MyPost>나의 게시물</S.MyPost>
        <S.MyPostUl>
          {myPostsData.map((post) => (
            <PostList key={post.postkey} {...post} />
          ))}
        </S.MyPostUl>
      </MainContainer>
      <Nav />
    </>
  );
}

export default ProfilePage;
