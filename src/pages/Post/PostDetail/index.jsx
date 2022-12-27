import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { MainContainer } from "../../../components/MainContainer";
import userProfile from "../../../assets/user-profile.png";
import partyUser from "../../../assets/icons/icon-user.png";
import OtherUserChatting from "./OtherUserChatting";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  deleteDoc,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../../firebase";
import Chatting from "../../../components/ChattingForm";
import "react-confirm-alert/src/react-confirm-alert.css";
import PartyName from "./PartyName";
import * as S from "./style";
import handleVertical from "../../../utils/handleVertical";
import useWriter from "../../../hooks/useGetInfo";
import useCollectionGroup from "../../../hooks/useCollectionGroup";
import useCollection from "../../../hooks/useCollection";
import PrevBtn from "../../../components/Header/PrevBtn";
import VerticalBtn from "../../../components/Header/VerticalBtn";
import { CreateDMRoomId } from "../../../utils/CreateDMRoomId";

function PostDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userInfo = useSelector((state) => state.user.currentUser);
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
    const postRef = doc(db, "posts", documents.postkey);
    await updateDoc(postRef, {
      party: newParty,
    });
  };
  const delPost = async () => {
    await deleteDoc(doc(db, "posts", documents.postkey));
    navigate(-1);
  };

  // 게시글 작성자와 DMg하기 위해 방을 만든다.
  const setDM = (otherUser) => {
    const dmid = CreateDMRoomId(otherUser, userInfo.uid); // DM방 생성
    const dmRoom = doc(db, "DMROOMS", dmid);

    //[방 생성자id,상대방id ]데이터 넣어준 후 DM방 데이터 가져올 시 [클릭한 유저]가 있는 list만 가져온다.
    setDoc(dmRoom, {
      id: dmid,
      CreateAt: serverTimestamp(),
      ids: [otherUser, userInfo.uid],
    });
  };
  useEffect(() => {
    getDocuments("posts", "postkey", id, "==");
    getChats("post", "currentPostId", id);
  }, []);
  return (
    <>
      {isLoding ? (
        <>...Loding</>
      ) : (
        <>
          <Header ir="게시물 상세페이지">
            <PrevBtn />
            <VerticalBtn
              verticalSubmit={() =>
                handleVertical(
                  userInfo.uid,
                  documents.writerId,
                  "게시글을 삭제하시겠습니까?",
                  delPost,
                  "쪽지를 보내겠습니까?",
                  setDM
                )
              }
            />
          </Header>
          <MainContainer pr="0">
            <S.PostDetailContainer>
              <h2 className="ir">게시글 콘텐츠</h2>
              <S.UserContainer>
                <S.UserProfileImg
                  src={userPhotoURL || userProfile}
                  alt="유저 프로필"
                />
                <S.UserName>{userName} </S.UserName>
              </S.UserContainer>
              <S.DeadLine>
                {documents.postDate} {documents.postTime} 까지 모집
              </S.DeadLine>
              <S.ContentsTitle>{documents.postTit}</S.ContentsTitle>
              <S.ContentsTxt>{documents.postTxt}</S.ContentsTxt>
              {documents.postImg && (
                <S.ContentsImg src={documents.postImg} alt="" />
              )}
              <S.JoinConatiner>
                <S.JoinBtn onClick={handlePartyBtn}>참여하기</S.JoinBtn>
                <S.JoinUserIcon src={partyUser} alt="" />
                <S.JoinSpan> {documents.party.participateCount}</S.JoinSpan>
              </S.JoinConatiner>
              <S.JoinUserNames>
                {documents.party.participants.map((participant, index) => (
                  <PartyName
                    key={participant}
                    userId={participant}
                    index={index}
                    length={documents.party.participants.length}
                  />
                ))}
              </S.JoinUserNames>
            </S.PostDetailContainer>
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
