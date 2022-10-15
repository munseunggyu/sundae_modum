import styled from "styled-components";
import userProfile from '../../../assets/user-profile.png'
import logo from '../../../assets/logo.png'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../../firebase";

const Postli = styled.li`
  border-bottom:1px solid #dbdbdb;
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
function PostList({participateCount,recruit,postkey,postImg,postCount,postDate,postTime,postTit,postTxt,writer}){
  const navigate = useNavigate()
  const userInfo = useSelector(state => state.user)
  return(
    <Postli>
      <PostBtn onClick={() => navigate(`postdetail/${postTit}`)}>
        <div>
        <PostContentContainer>
          <UserProfileImg src={writer.photoURL} alt="유저 프로필" />
          <PostTextContainer>
          <UserName>{writer.displayName}</UserName>
          <strong>{postTit}</strong>
          <PostTextBottomContainer>
          <time>
            {postDate} {postTime}
          </time>
          {/* <span>18</span> 채팅 수 */}
          <strong>{participateCount}/{recruit}</strong> {/* 인원 수 */}
          </PostTextBottomContainer>
          </PostTextContainer>
        </PostContentContainer>
        </div>
        {
          postImg &&
          (
            <FoodImg src={postImg} alt="" />
          )
        }
      </PostBtn>
    </Postli>
  )
}

export default PostList