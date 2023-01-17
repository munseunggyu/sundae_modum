import React, { useEffect, useState } from "react";
import useCollection from "../../hooks/useCollection";
import Header from "../../components/Header";
import { MainContainer } from "../../components/MainContainer";
import Nav from "../../components/Nav";
import PostList from "../Post/PostList";
import * as S from "./style";
import HeaderTitle from "../../components/Header/HeaderTitle";
import SearchButton from "../../components/Header/SearchButton";
import { DocumentData } from "firebase/firestore";

function HomePage() {
  const [searchList, setSearchList] = useState<DocumentData[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const [select, setSelect] = useState("치킨");
  const { documents: postsList, getDocuments: getPostsList } = useCollection();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setIsSearch(true);
      const regex = new RegExp(e.target.value, "gi");
      if (!postsList) return;
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
            ? searchList.map((post) => (
                <PostList
                  key={post.postkey}
                  party={post.party}
                  postkey={post.postkey}
                  postImg={post.postImg}
                  postDate={post.postDate}
                  postTime={post.postTime}
                  postTit={post.postTit}
                  writerId={post.writerId}
                  CreateAt={post.CreateAt}
                  category={post.category}
                />
              ))
            : postsList.map((post) => {
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
                    CreateAt={post.CreateAt}
                    category={post.category}
                  />
                );
              })}
        </S.PostUl>
      </MainContainer>

      <Nav />
    </S.HomeContainer>
  );
}

export default HomePage;
