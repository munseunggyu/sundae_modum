import React, { useEffect, useState } from "react";
import useCollection from "../../hooks/useCollection";
import Header from "../../components/Header";
import { MainContainer } from "../../components/MainContainer";
import Nav from "../../components/Nav";
import Post from "../Post/PostList";
import * as S from "./style";
import HeaderTitle from "../../components/Header/HeaderTitle";
import SearchButton from "../../components/Header/SearchButton";
import { IPost } from "../../types/post";

function HomePage() {
  const [searchList, setSearchList] = useState<IPost[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [select, setSelect] = useState("치킨");
  const { documents: postsList, getDocuments: getPostsList } = useCollection();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setIsSearch(true);
      const regex = new RegExp(e.target.value, "gi");
      const newPost = postsList.filter(
        (post) => regex.test(post.postTit) || regex.test(post.postTxt)
      );
      setSearchList(newPost);
    } else {
      setIsSearch(false);
    }
  };

  useEffect(() => {
    getPostsList({
      collectionName: "posts",
      whereLeft: "category",
      whereRight: select,
      condition: "==",
    });
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
            ? searchList.map((post) => <Post {...post} key={post.postkey} />)
            : postsList.map((post) => <Post {...post} key={post.postkey} />)}
        </S.PostUl>
      </MainContainer>

      <Nav />
    </S.HomeContainer>
  );
}

export default HomePage;
