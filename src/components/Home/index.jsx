import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from "react"
import styled from "styled-components"
import Header from "../../common/Header"
import { MainContainer } from "../../common/MainContainer"
import Nav from "../../common/Nav"
import { IrH2 } from "../../common/TextHide"
import { db } from "../../firebase"
import Post from "../Post/PostList"

const HomeContainer = styled.div`
  position: relative;
`;
const PostUl = styled.ul`
  margin-top:5px;
`;

function HomePage(){
  const [postsData,setPostsData] = useState([])

  const handleClick = (e) => {
    console.log(e)
  }
  useEffect(() => {
    // 최신 작성 순으로 정렬
    const postsRef = collection(db,'posts')
    const q = query(postsRef,orderBy('CreateAt','desc')) 
    const posts = onSnapshot(q,snapshot => {
      const newArr = snapshot.docs.map(doc => {
        return doc.data() 
      })
      setPostsData(newArr)
    })
  },[])
  return(
    <HomeContainer>
      <Header h1='순대 모둠' search={true} />
      <MainContainer>
        <IrH2>게시글</IrH2>
        <PostUl>
          {
            postsData.map((post,index) => <Post 
            {...post} 
            key={post.postkey}
            />)
          }
        </PostUl>
      </MainContainer>
      <Nav />
    </HomeContainer>
  )
}

export default HomePage