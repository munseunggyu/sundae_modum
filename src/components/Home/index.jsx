import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Category from '../../common/Category';
import Header from '../../common/Header';
import { MainContainer } from '../../common/MainContainer';
import Nav from '../../common/Nav';
import { IrH2 } from '../../common/TextHide';
import { db } from '../../firebase';
import Post from '../Post/PostList';
import { HomeContainer, PostUl } from './style';

const TopScrollBtn = styled.button`
  position: absolute;
  bottom: 0;
`;

function HomePage() {
  const [postsData, setPostsData] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [select, setSelect] = useState('치킨');

  // 검색 기능
  // 게시글의 제목 또는 게시글의 내용으로 검색
  const handleSearch = (e) => {
    if (e.target.value.length > 0) {
      setIsSearch(true);
      const regex = new RegExp(e.target.value, 'gi');
      const newPost = postsData.filter(
        (post) => regex.test(post.postTit) || regex.test(post.postTxt)
      );
      setSearchList(newPost);
    } else {
      setIsSearch(false);
    }
  };

  useEffect(() => {
    // 최신 작성 순으로 정렬
    const postsRef = collection(db, 'posts');
    const q = query(
      postsRef,
      where('category', '==', select),
      orderBy('CreateAt', 'desc')
    );
    const posts = onSnapshot(q, (snapshot) => {
      const newArr = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setPostsData(newArr);
    });
  }, [select]);
  return (
    <HomeContainer>
      <Header
        h1="순대 모둠"
        search={true}
        handleSearch={handleSearch}
        setIsSearch={setIsSearch}
      >
        <Category select={select} setSelect={setSelect} />
      </Header>
      <MainContainer>
        <IrH2>게시글</IrH2>
        <PostUl>
          {isSearch
            ? searchList.map((post, index) => (
                <Post index={index} {...post} key={post.postkey} />
              ))
            : postsData.map((post, index) => (
                <Post index={index} {...post} key={post.postkey} />
              ))}
        </PostUl>
      </MainContainer>

      <Nav />
    </HomeContainer>
  );
}

export default HomePage;
