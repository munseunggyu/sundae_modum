import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../common/Header';
import { MainContainer } from '../../../common/MainContainer';
import userProfile from '../../../assets/user-profile.png';
import partyUser from '../../../assets/icons/icon-user.png';
import OtherUserChatting from './OtherUserChatting';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  collection,
  collectionGroup,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import Chatting from '../../../common/ChattingForm';
import 'react-confirm-alert/src/react-confirm-alert.css';
import PartyName from './PartyName';
import {
  ContentsImg,
  ContentsTitle,
  ContentsTxt,
  DeadLine,
  JoinBtn,
  JoinConatiner,
  JoinSpan,
  JoinUserIcon,
  JoinUserNames,
  PostDetailContainer,
  UserContainer,
  UserName,
  UserProfileImg,
} from './style';
import handleVertical from '../../../utils/handleVertical';
import useWriter from '../../../hooks/useGetInfo';

function PostDetailPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const userInfo = useSelector((state) => state.user.currentUser);
  const [currentPost, setCurrentPost] = useState([]);
  const [postLoding, setPostLoding] = useState(true);
  const [chattings, setChattings] = useState([]);
  const { userName, userPhotoURL, getInfo } = useWriter();

  // 댓글 불러오기
  const getChatting = () => {
    try {
      const q = query(
        collectionGroup(db, 'post'),
        where('currentPostId', '==', id),
        orderBy('CreateAt', 'asc')
      );
      // const querySnapshot = await getDocs(q);
      onSnapshot(q, (querySnapshot) => {
        const newChatting = querySnapshot.docs.map((doc) => {
          return doc.data({ serverTimestamps: 'estimate' });
        });
        setChattings(newChatting);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getNew = async () => {
    const citiesRef = collection(db, 'posts');
    const q = query(citiesRef, where('postkey', '==', id));
    onSnapshot(q, (querySnapshot) => {
      const postData = [];
      querySnapshot.forEach((postDoc) => {
        postData.push(postDoc.data({ serverTimestamps: 'estimate' }));
      });
      setCurrentPost(...postData);
      if (postData.length <= 0) {
        navigate('/');
        return;
      }
      getInfo(postData[0].writerId);
      setPostLoding(false);
    });
  };
  // 참여하기 버튼 기능
  const handlePartyBtn = async () => {
    const isParty = currentPost.party.participants.find(
      (participant) => participant === userInfo.uid
    );
    let newParty;
    if (isParty) {
      const cancel = currentPost.party.participants.filter(
        (v) => v !== userInfo.uid
      );
      newParty = {
        ...currentPost.party,
        participants: [...cancel],
        participateCount: currentPost.party.participants.length - 1,
      };
    } else {
      newParty = {
        ...currentPost.party,
        participants: [...currentPost.party.participants, userInfo.uid],
        participateCount: currentPost.party.participants.length + 1,
      };
    }
    const postRef = doc(db, 'posts', currentPost.postkey);
    await updateDoc(postRef, {
      party: newParty,
    });
  };

  const delPost = async () => {
    await deleteDoc(doc(db, 'posts', currentPost.postkey));
    navigate(-1);
  };
  // DM의 같은 ID 값을 유지해주기 위해서
  const CreateDMRoomId = (selectUser) => {
    return userInfo.uid > selectUser
      ? `${selectUser}${userInfo.uid}`
      : `${userInfo.uid}${selectUser}`;
  };
  // 게시글 작성자와 DM하기 위해 방을 만든다.
  const setDM = (otherUser) => {
    const dmid = CreateDMRoomId(otherUser); // DM방 생성
    const dmRoom = doc(db, 'DMROOMS', dmid);

    //[방 생성자id,상대방id ]데이터 넣어준 후 DM방 데이터 가져올 시 [클릭한 유저]가 있는 list만 가져온다.
    setDoc(dmRoom, {
      id: dmid,
      CreateAt: serverTimestamp(),
      ids: [otherUser, userInfo.uid],
    });
  };

  useEffect(() => {
    getNew();
    getChatting();
  }, []);
  return (
    <>
      {postLoding ? (
        <>...Loding</>
      ) : (
        <>
          <Header
            ir="게시물 상세페이지"
            prv={true}
            vertical={true}
            verticalSubmit={() =>
              handleVertical(
                userInfo.uid,
                currentPost.writerId,
                '게시글을 삭제하시겠습니까?',
                delPost,
                '쪽지를 보내겠습니까?',
                setDM
              )
            }
          />
          <MainContainer pr="0">
            <PostDetailContainer>
              <h2 className="ir">게시글 콘텐츠</h2>
              <UserContainer>
                <UserProfileImg
                  src={userPhotoURL || userProfile}
                  alt="유저 프로필"
                />
                <UserName>{userName} </UserName>
              </UserContainer>
              <DeadLine>
                {currentPost.postDate} {currentPost.postTime} 까지 모집
              </DeadLine>
              <ContentsTitle>{currentPost.postTit}</ContentsTitle>
              <ContentsTxt>{currentPost.postTxt}</ContentsTxt>
              {currentPost.postImg && (
                <ContentsImg src={currentPost.postImg} alt="" />
              )}
              <JoinConatiner>
                <JoinBtn onClick={handlePartyBtn}>참여하기</JoinBtn>
                <JoinUserIcon src={partyUser} alt="" />
                <JoinSpan> {currentPost.party.participateCount}</JoinSpan>
              </JoinConatiner>
              <JoinUserNames>
                {currentPost.party.participants.map((participant, index) => (
                  <PartyName
                    key={participant}
                    userId={participant}
                    index={index}
                    length={currentPost.party.participants.length}
                  />
                ))}
              </JoinUserNames>
            </PostDetailContainer>
            <ul>
              {chattings.map((chatting, i) => (
                <OtherUserChatting {...chatting} />
              ))}
            </ul>
            <Chatting />
          </MainContainer>
        </>
      )}
    </>
  );
}

export default PostDetailPage;
