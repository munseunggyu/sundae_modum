import styled from "styled-components";
import userProfile from '../../../assets/user-profile.png'
import logo from '../../../assets/logo.png'
import { useNavigate } from "react-router-dom";

const Postli = styled.li`
  border-bottom:1px solid rgb(219,219,219);
  margin-bottom:5px;
  &:first-child{
    /* margin-top:5px; */
  }
  &:last-child{
    border:0;
  }
`;

const PostBtn = styled.button`
  width:100%;
  padding-bottom:5px;
  background-color:transparent;
  display: flex;
  justify-content:space-between;
  align-items:center;
`;
const PostContentContainer = styled.div`
  display: flex;
  align-items:flex-end;
  
`;
const UserProfileImg = styled.img`
  width:42px;
  height:42px;
  background-color:transparent;
  border-radius:50%;
  margin:10px 10px 10px 0;
`;
const FoodImg = styled.img`
  width:60px;
  height:60px;
  border-radius:20px;
  overflow:hidden;
`;
const PostTextContainer = styled.div`
  display: flex;
  flex-direction:column;
  align-items:flex-start;
  gap:2px;
`;
const UserName = styled.span`
  font-weight:600;
    font-size:15px;
`
const PostTextBottomContainer = styled.div`
  display: flex;
  gap:3px;
  span{
  }
`
function PostList({value}){
  const navigate = useNavigate()
  return(
    <Postli>
      <PostBtn onClick={() => navigate(`postdetail/${value}`)}>
        <div>
        <PostContentContainer>
          <UserProfileImg src={userProfile} alt="유저 프로필" />
          <PostTextContainer>
          <UserName>유저이름</UserName>
          <strong>오늘 1시에 치킨</strong>
          <PostTextBottomContainer>
          <time>
            10/4 13:00
          </time>
          <span>18</span> {/* 채팅 수 */}
          <strong>3/4</strong> {/* 인원 수 */}
          </PostTextBottomContainer>
          </PostTextContainer>
        </PostContentContainer>
        </div>
        <FoodImg src="https://images.unsplash.com/photo-1578874557108-9fc2cfb1121e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpa2VufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="" />
      </PostBtn>
    </Postli>
  )
}

export default PostList