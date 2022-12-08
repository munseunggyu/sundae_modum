import styled from 'styled-components';
import userProfile from '../../../assets/user-profile.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import partyUser from '../../../assets/icons/icon-user.png';
import {
  PartyContainer,
  PartyUser,
  PostBtn,
  PostContentContainer,
  PostImg,
  Postli,
  PostTextBottomContainer,
  PostTextContainer,
  UserName,
  UserProfileImg,
} from './style';
import useWriter from '../../../hooks/useGetInfo';

function PostList({
  party,
  postkey,
  postImg,
  postDate,
  postTime,
  postTit,
  writerId,
}) {
  const navigate = useNavigate();
  const { userName, userPhotoURL, getInfo } = useWriter();

  getInfo(writerId);

  const handleClick = async () => {
    navigate(`/postdetail/${postkey}`);
  };
  return (
    <Postli>
      <PostBtn onClick={handleClick}>
        <div>
          <PostContentContainer>
            <UserProfileImg
              src={userPhotoURL || userProfile}
              alt="유저 프로필"
            />
            <PostTextContainer>
              <UserName>{userName}</UserName>
              <strong>{postTit}</strong>
              <PostTextBottomContainer>
                <span>
                  {postDate} {postTime}
                </span>
                <PartyContainer>
                  <PartyUser src={partyUser} alt="" />
                  <strong>{party.participateCount}</strong>
                </PartyContainer>
              </PostTextBottomContainer>
            </PostTextContainer>
          </PostContentContainer>
        </div>
        {postImg && <PostImg src={postImg} alt="" />}
      </PostBtn>
    </Postli>
  );
}

export default PostList;
