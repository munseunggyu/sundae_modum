import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { MainContainer } from "../../../components/MainContainer";
import userProfile from "../../../assets/user-profile.png";
import partyUser from "../../../assets/icons/icon-user.png";
import OtherUserChatting from "./OtherUserChatting";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
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
import { setDM } from "../../../utils/setDM";

function PostDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const userInfo = useSelector((state) => state.user.currentUser);
  const { userName, userPhotoURL, getInfo } = useWriter();
  const { chats: commentList, getChats: getCommentList } = useCollectionGroup();
  const {
    documents: postDataObj,
    getDocuments: getPostData,
    isLoding: postLoading,
  } = useCollection(true);
  const postData = postDataObj[0];
  !postLoading && getInfo(postData.writerId);
  // 참여하기 버튼 기능
  const handlePartyBtn = async () => {
    const isParty = postData.party.participants.find(
      (participant) => participant === userInfo.uid
    );
    let newParty;
    if (isParty) {
      const cancel = postData.party.participants.filter(
        (v) => v !== userInfo.uid
      );
      newParty = {
        ...postData.party,
        participants: [...cancel],
        participateCount: postData.party.participants.length - 1,
      };
    } else {
      newParty = {
        ...postData.party,
        participants: [...postData.party.participants, userInfo.uid],
        participateCount: postData.party.participants.length + 1,
      };
    }
    const postRef = doc(db, "posts", postData.postkey);
    await updateDoc(postRef, {
      party: newParty,
    });
  };
  const delPost = async () => {
    await deleteDoc(doc(db, "posts", postData.postkey));
    navigate(-1);
  };

  useEffect(() => {
    getPostData("posts", "postkey", id, "==");
    getCommentList("post", "currentPostId", id);
  }, []);
  return (
    <>
      {postLoading ? (
        <>...Loding</>
      ) : (
        <>
          <Header ir="게시물 상세페이지">
            <PrevBtn />
            <VerticalBtn
              verticalSubmit={() =>
                handleVertical(
                  userInfo.uid,
                  postData.writerId,
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
                {postData.postDate} {postData.postTime} 까지 모집
              </S.DeadLine>
              <S.ContentsTitle>{postData.postTit}</S.ContentsTitle>
              <S.ContentsTxt>{postData.postTxt}</S.ContentsTxt>
              {postData.postImg && (
                <S.ContentsImg src={postData.postImg} alt="" />
              )}
              <S.JoinConatiner>
                <S.JoinBtn onClick={handlePartyBtn}>참여하기</S.JoinBtn>
                <S.JoinUserIcon src={partyUser} alt="" />
                <S.JoinSpan> {postData.party.participateCount}</S.JoinSpan>
              </S.JoinConatiner>
              <S.JoinUserNames>
                {postData.party.participants.map((participant, index) => (
                  <PartyName
                    key={participant}
                    userId={participant}
                    index={index}
                    length={postData.party.participants.length}
                  />
                ))}
              </S.JoinUserNames>
            </S.PostDetailContainer>
            <ul>
              {commentList.map((chatting, i) => (
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
