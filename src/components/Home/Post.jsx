import styled from "styled-components";
import userProfile from '../../assets/user-profile.jpeg'
import logo from '../../assets/logo.png'

const PostBtn = styled.button`
  width:100%;
  background-color:transparent;
  border-bottom:1px solid rgb(219,219,219);
  display: flex;
  justify-content:space-between;
  align-items:center;
  padding-bottom:5px;
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
  width:65px;
  height:65px;
  border-radius:20px;
  overflow:hidden;
`;
const PostTextContainer = styled.div`
  display: flex;
  flex-direction:column;
  align-items:flex-start;
  gap:2px;
  span{
    font-weight:600;
    font-size:15px;
  }
`;

function Post(){

  return(
    <li>
      <PostBtn>
        <div>
        <PostContentContainer>
          <UserProfileImg src={userProfile} alt="" />
          <PostTextContainer>
          <span>유저이름</span>
          <strong>오늘 1시에 치킨 드실분</strong>
          <time>
              10월4일(화) 13:00
          </time>
          </PostTextContainer>
        </PostContentContainer>
        </div>
        <FoodImg src="https://images.unsplash.com/photo-1578874557108-9fc2cfb1121e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2hpa2VufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60" alt="음식사진" />
      </PostBtn>
    </li>
  )
}

export default Post