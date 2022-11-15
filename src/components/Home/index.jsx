import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from '../../common/Header';
import { MainContainer } from '../../common/MainContainer';
import Nav from '../../common/Nav';
import { IrH2 } from '../../common/TextHide';
import { db } from '../../firebase';
import Post from '../Post/PostList';

const HomeContainer = styled.div`
  position: relative;
`;
const PostUl = styled.ul`
  margin-top: 5px;
`;

function HomePage() {
  const [postsData, setPostsData] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [isSearch, setIsSearch] = useState(false);

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
    const q = query(postsRef, orderBy('CreateAt', 'desc'));
    const posts = onSnapshot(q, (snapshot) => {
      const newArr = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setPostsData(newArr);
    });
  }, []);
  return (
    <HomeContainer>
      <Header
        h1="순대 모둠"
        search={true}
        handleSearch={handleSearch}
        setIsSearch={setIsSearch}
      />
      <MainContainer>
        <IrH2>게시글</IrH2>
        <PostUl>
          {isSearch
            ? searchList.map((post) => <Post {...post} key={post.postkey} />)
            : postsData.map((post) => <Post {...post} key={post.postkey} />)}
        </PostUl>
      </MainContainer>
      <Nav />
    </HomeContainer>
  );
}

export default HomePage;
