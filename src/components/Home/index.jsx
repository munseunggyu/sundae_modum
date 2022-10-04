import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Header from "../../common/Header"
import Nav from "../../common/Nav"
import { IrH2 } from "../../common/TextHide"
import { setUser } from "../../redux/actions/user_action"
import Post from "./Post"

const HomeContainer = styled.div`
  position: relative;
`;
const PostUl = styled.ul`
  padding:12px 0;
`;
const HomeMain = styled.main`
  max-width:450px;
  width:100%;
  margin:0 auto;
  padding: 48px 12px;
`;

function HomePage(){
  let test = [1,2,3,4,5,6,7,8,9,10]
  return(
    <HomeContainer>
      <Header h1='순대 모둠' search={true} />
      <HomeMain>
        <IrH2>게시글</IrH2>
        <PostUl>
          {
            test.map(v => <Post key={v} />)
          }
        </PostUl>
      </HomeMain>
      <Nav />
    </HomeContainer>
  )
}

export default HomePage