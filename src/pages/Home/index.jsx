import { useEffect, useState } from "react";
import useCollection from "../../hooks/useCollection";
import Header from "../../components/Header";
import { MainContainer } from "../../components/MainContainer";
import Nav from "../../components/Nav";
import Post from "../Post/PostList";
import * as S from "./style";
import HeaderTitle from "../../components/Header/HeaderTitle";
import SearchButton from "../../components/Header/SearchButton";

function HomePage() {
  const [searchList, setSearchList] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [select, setSelect] = useState("치킨");
  const { documents, getDocuments } = useCollection(false, true);

  // 검색 기능
  // 게시글의 제목 또는 게시글의 내용으로 검색
  const handleSearch = (e) => {
    if (e.target.value.length > 0) {
      setIsSearch(true);
      const regex = new RegExp(e.target.value, "gi");
      const newPost = documents.filter(
        (post) => regex.test(post.postTit) || regex.test(post.postTxt)
      );
      setSearchList(newPost);
    } else {
      setIsSearch(false);
    }
  };
  useEffect(() => {
    getDocuments("posts", "category", select, "==");
  }, [select]);
  return (
    <S.HomeContainer>
      <Header category="1" select={select} setSelect={setSelect}>
        <HeaderTitle>순대모둠</HeaderTitle>
        <SearchButton handleSearch={handleSearch} setIsSearch={setIsSearch} />
      </Header>

      <MainContainer>
        <h2 className="ir">게시글</h2>
        <S.PostUl>
          {isSearch
            ? searchList.map((post, index) => (
                <Post index={index} {...post} key={post.postkey} />
              ))
            : documents.map((post, index) => (
                <Post index={index} {...post} key={post.postkey} />
              ))}
        </S.PostUl>
      </MainContainer>

      <Nav />
    </S.HomeContainer>
  );
}

export default HomePage;
