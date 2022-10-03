import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { setUser } from "../../redux/actions/user_action"

function HomePage(){

  return(
    <>
      Home
      <Link to='login' >login</Link>
    </>
  )
}

export default HomePage