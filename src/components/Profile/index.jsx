import styled from 'styled-components';
import Header from '../../common/Header';
import { MainContainer } from '../../common/MainContainer';
import userImg from '../../assets/user-profile.png';
import PostList from '../Post/PostList';
import { useNavigate } from 'react-router-dom';
import Nav from '../../common/Nav';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { clearUser } from '../../redux/actions/user_action';
import { IrH2 } from '../../common/TextHide';
import {
  MyPost,
  MyPostUl,
  ProfileContainer,
  UserIntroduce,
  UserName,
  UserProfileEditBtn,
  UserProfileImg,
} from './style';

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.currentUser);
  const [myPost, setMyPost] = useState([]);
  const getMyPost = async () => {
    const postsRef = collection(db, 'posts');
    const q = query(
      postsRef,
      where('writerId', '==', userInfo.uid),
      orderBy('CreateAt', 'desc')
    );
    const posts = onSnapshot(q, (snapshot) => {
      const newArr = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMyPost(newArr);
    });
  };
  const signOutUser = () => {
    signOut(auth);
    dispatch(clearUser());
  };
  useEffect(() => {
    getMyPost();
  }, []);
  return (
    <>
      <Header ir="프로필 페이지" prv={true} />
      <MainContainer>
        <ProfileContainer>
          <IrH2>프로필 정보 및 수정</IrH2>
          <UserProfileImg src={userInfo.photoURL || userImg} />
          <UserName>{userInfo.displayName}</UserName>
          <UserIntroduce>{userInfo.introduce} </UserIntroduce>
          <UserProfileEditBtn onClick={() => navigate('editprofile')}>
            프로필 수정하기
          </UserProfileEditBtn>
          <button onClick={signOutUser}>로그아웃</button>
        </ProfileContainer>
        <MyPost>나의 게시물</MyPost>
        <MyPostUl>
          {myPost.map((post) => (
            <PostList key={post.postkey} {...post} />
          ))}
        </MyPostUl>
      </MainContainer>
      <Nav />
    </>
  );
}

export default ProfilePage;
