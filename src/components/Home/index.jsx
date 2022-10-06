import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Header from "../../common/Header"
import { MainContainer } from "../../common/MainContainer"
import Nav from "../../common/Nav"
import { IrH2 } from "../../common/TextHide"
import { setUser } from "../../redux/actions/user_action"
import Post from "../Post/PostList"

const HomeContainer = styled.div`
  position: relative;
`;
const PostUl = styled.ul`
`;

function HomePage(){
  let test = [1,2,3,4,5]
  return(
    <HomeContainer>
      <Header h1='순대 모둠' search={true} />
      <MainContainer>
        <IrH2>게시글</IrH2>
        <PostUl>
          {
            test.map(v => <Post key={v} />)
          }
        </PostUl>
      </MainContainer>
      <Nav />
    </HomeContainer>
  )
}

export default HomePage