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

function PostList({
  party,
  postkey,
  postImg,
  postDate,
  postTime,
  postTit,
  postTxt,
  writerId,
  index,
}) {
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const [writerName, setWriterName] = useState('');
  const [writerPhotoURL, setWriterPhotoURL] = useState('');

  // 지금 작성자의 uid를 나는 알고 있다. 그러니 그것을 가지고 users에서 그 작성자를 찾아 그 데이터를 뿌려 준다
  onSnapshot(doc(db, 'users', writerId), (doc) => {
    setWriterName(doc.data().displayName);
    setWriterPhotoURL(doc.data().photoURL);
  });
  const postData = {
    party: {
      participateCount: party.participateCount,
      participants: party.participants,
    },
    postkey,
    postImg,
    postDate,
    postTime,
    postTit,
    postTxt,
    writerId,
    isLoding: true,
  };
  const handleClick = async () => {
    navigate(`/postdetail/${postkey}`);
  };
  return (
    <Postli>
      <PostBtn onClick={handleClick}>
        <div>
          <PostContentContainer>
            <UserProfileImg
              src={writerPhotoURL || userProfile}
              alt="유저 프로필"
            />
            <PostTextContainer>
              <UserName>{writerName}</UserName>
              <strong>{postTit}</strong>
              <PostTextBottomContainer>
                <time>
                  {postDate} {postTime}
                </time>
                {/* <span>18</span> 채팅 수 */}
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
