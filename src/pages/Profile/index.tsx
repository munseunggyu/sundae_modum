import Header from "../../components/Header";
import { MainContainer } from "../../components/MainContainer";
import userImg from "../../assets/user-profile.png";
import PostList from "../Post/PostList";
import { useNavigate } from "react-router-dom";
import Nav from "../../components/Nav";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useContext, useEffect } from "react";
import * as S from "./style";
import useCollection from "../../hooks/useCollection";
import PrevBtn from "../../components/Header/PrevBtn";
import { AuthContext } from "../../context/AuthContext";
import { CLEAR_USER } from "../../context/context.type";

function ProfilePage() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AuthContext);
  const { documents: myPostsData, getDocuments: getMyPostsData } =
    useCollection();
  const signOutUser = () => {
    signOut(auth);
    dispatch({ type: CLEAR_USER });
  };
  useEffect(() => {
    getMyPostsData({
      collectionName: "posts",
      whereLeft: "writerId",
      whereRight: state.currentUser?.uid,
      condition: "==",
    });
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
            src={state.currentUser?.photoURL || userImg}
            alt="유저 프로필 이미지"
          />
          <S.UserName>{state.currentUser?.displayName}</S.UserName>
          <S.UserIntroduce>{state.currentUser?.introduce} </S.UserIntroduce>
          <S.UserProfileEditBtn onClick={() => navigate("editprofile")}>
            프로필 수정하기
          </S.UserProfileEditBtn>
          <button onClick={signOutUser}>로그아웃</button>
        </S.ProfileContainer>
        <S.MyPost>나의 게시물</S.MyPost>
        <S.MyPostUl>
          {myPostsData.map((post) => {
            return (
              <PostList
                key={post.postkey}
                party={post.party}
                postkey={post.postkey}
                postImg={post.postImg}
                postDate={post.postDate}
                postTime={post.postTime}
                postTit={post.postTit}
                writerId={post.writerId}
              />
            );
          })}
        </S.MyPostUl>
      </MainContainer>
      <Nav />
    </>
  );
}

export default ProfilePage;
