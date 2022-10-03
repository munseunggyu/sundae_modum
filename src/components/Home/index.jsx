import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"
import Header from "../../common/Header"
import { setUser } from "../../redux/actions/user_action"

const HomeContainer = styled.div`
  position: relative;
`;

function HomePage(){

  return(
    <HomeContainer>
      <Header h1='순대 모둠' />
      <Link to='snslogin' >login</Link>
    </HomeContainer>
  )
}

export default HomePage