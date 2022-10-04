import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Header from "../../common/Header"
import Nav from "../../common/Nav"
import { setUser } from "../../redux/actions/user_action"
import Post from "./Post"

const HomeContainer = styled.div`
  position: relative;
`;
const Btn = styled.button`
  margin-top:48px;
`;
function HomePage(){
  return(
    <HomeContainer>
      <Header h1='순대 모둠' />
      <Post />
      <Nav />
    </HomeContainer>
  )
}

export default HomePage