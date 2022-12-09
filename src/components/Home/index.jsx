import { useEffect, useState } from 'react';
import useCollection from '../../hooks/useCollection';
import Category from '../../common/Category';
import Header from '../../common/Header';
import { MainContainer } from '../../common/MainContainer';
import Nav from '../../common/Nav';
import Post from '../Post/PostList';
import { HomeContainer, PostUl } from './style';

function HomePage() {
  const [searchList, setSearchList] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [select, setSelect] = useState('치킨');
  const { documents, getDocuments } = useCollection(false, true);

  // 검색 기능
  // 게시글의 제목 또는 게시글의 내용으로 검색
  const handleSearch = (e) => {
    // if (e.target.value.length > 0) {
    //   setIsSearch(true);
    //   const regex = new RegExp(e.target.value, 'gi');
    //   const newPost = documents.filter(
    //     (post) => regex.test(post.postTit) || regex.test(post.postTxt)
    //   );
    //   setSearchList(newPost);
    // } else {
    //   setIsSearch(false);
    // }
  };
  useEffect(() => {
    getDocuments('posts', 'category', select, '==');
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
        <h2 className="ir">게시글</h2>
        <PostUl>
          {isSearch
            ? searchList.map((post, index) => (
                <Post index={index} {...post} key={post.postkey} />
              ))
            : documents.map((post, index) => (
                <Post index={index} {...post} key={post.postkey} />
              ))}
        </PostUl>
      </MainContainer>

      <Nav />
    </HomeContainer>
  );
}

export default HomePage;
