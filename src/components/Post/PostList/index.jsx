import styled from 'styled-components';
import userProfile from '../../../assets/user-profile.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import {
  clearCurrentPost,
  setCurrentPost,
} from '../../../redux/actions/post_action';
import partyUser from '../../../assets/icons/icon-user.png';

const Postli = styled.li`
  border-bottom: 1px solid #dbdbdb;
  margin-bottom: 5px;
  &:first-child {
    /* margin-top:5px; */
  }
  &:last-child {
    border: 0;
  }
`;

const PostBtn = styled.button`
  width: 100%;
  padding-bottom: 5px;
  background-color: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PostContentContainer = styled.div`
  display: flex;
  align-items: flex-end;
`;
const UserProfileImg = styled.img`
  width: 42px;
  height: 42px;
  background-color: transparent;
  border-radius: 50%;
  margin: 10px 10px 10px 0;
`;
const PostImg = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 20px;
  overflow: hidden;
`;
const PostTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
`;
const UserName = styled.span`
  font-weight: 600;
  font-size: 15px;
`;
const PostTextBottomContainer = styled.div`
  display: flex;
  gap: 3px;
  span {
  }
`;
const PartyContainer = styled.div`
  display: flex;
`;
const PartyUser = styled.img`
  width: 14px;
  height: 14px;
`;
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
    dispatch(clearCurrentPost());
    dispatch(setCurrentPost(postData));
    await setDoc(doc(db, 'current_post', userInfo.uid), postData);
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
