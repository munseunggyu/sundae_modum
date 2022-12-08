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
  deleteDoc,
  doc,
  onSnapshot,
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
import useWriter from '../../../hooks/useGetInfo';
import useCollectionGroup from '../../../hooks/useCollectionGroup';
import useCollection from '../../../hooks/useCollection';

function PostDetailPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const userInfo = useSelector((state) => state.user.currentUser);
  const [currentPost, setCurrentPost] = useState([]);
  const [postLoding, setPostLoding] = useState(true);
  const { userName, userPhotoURL, getInfo } = useWriter();
  const { chats, error, getChats } = useCollectionGroup();
  const { documents, getDocuments, isLoding } = useCollection(true);

  !isLoding && getInfo(documents.writerId);
  // 참여하기 버튼 기능
  const handlePartyBtn = async () => {
    const isParty = documents.party.participants.find(
      (participant) => participant === userInfo.uid
    );
    let newParty;
    if (isParty) {
      const cancel = documents.party.participants.filter(
        (v) => v !== userInfo.uid
      );
      newParty = {
        ...documents.party,
        participants: [...cancel],
        participateCount: documents.party.participants.length - 1,
      };
    } else {
      newParty = {
        ...documents.party,
        participants: [...documents.party.participants, userInfo.uid],
        participateCount: documents.party.participants.length + 1,
      };
    }
    const postRef = doc(db, 'posts', documents.postkey);
    await updateDoc(postRef, {
      party: newParty,
    });
  };
  const delPost = async () => {
    await deleteDoc(doc(db, 'posts', documents.postkey));
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
    getDocuments('posts', 'postkey', id, '==');
    getChats('post', 'currentPostId', id);
  }, []);
  return (
    <>
      {isLoding ? (
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
                documents.writerId,
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
                {documents.postDate} {documents.postTime} 까지 모집
              </DeadLine>
              <ContentsTitle>{documents.postTit}</ContentsTitle>
              <ContentsTxt>{documents.postTxt}</ContentsTxt>
              {documents.postImg && (
                <ContentsImg src={documents.postImg} alt="" />
              )}
              <JoinConatiner>
                <JoinBtn onClick={handlePartyBtn}>참여하기</JoinBtn>
                <JoinUserIcon src={partyUser} alt="" />
                <JoinSpan> {documents.party.participateCount}</JoinSpan>
              </JoinConatiner>
              <JoinUserNames>
                {documents.party.participants.map((participant, index) => (
                  <PartyName
                    key={participant}
                    userId={participant}
                    index={index}
                    length={documents.party.participants.length}
                  />
                ))}
              </JoinUserNames>
            </PostDetailContainer>
            <ul>
              {chats.map((chatting, i) => (
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
