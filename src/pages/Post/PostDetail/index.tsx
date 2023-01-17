import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { MainContainer } from "../../../components/MainContainer";
import userProfile from "../../../assets/user-profile.png";
import partyUser from "../../../assets/icons/icon-user.png";
import OtherUserChatting from "./OtherUserChatting";
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
import { useAuthContext } from "../../../hooks/useAuthContext";

function PostDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useAuthContext();
  const userInfo = state.currentUser;
  const { userName, userPhotoURL, getInfo } = useWriter();
  const { chats: commentList, getChats: getCommentList } = useCollectionGroup();
  const {
    documents: postDataObj,
    getDocuments: getPostData,
    isLoding: postLoading,
  } = useCollection();
  const postData = postDataObj[0];
  !postLoading && getInfo(postData.writerId);

  const handlePartyBtn = async () => {
    const isParty = postData.party?.participants.find(
      (participant: string) => participant === userInfo?.uid
    );
    let newParty;
    if (isParty) {
      const cancel = postData.party.participants.filter(
        (participant: string) => participant !== userInfo?.uid
      );
      newParty = {
        ...postData.party,
        participants: [...cancel],
        participateCount: postData.party.participants.length - 1,
      };
    } else {
      newParty = {
        ...postData.party,
        participants: [...postData.party.participants, userInfo?.uid],
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
    getPostData({
      collectionName: "posts",
      whereLeft: "postkey",
      whereRight: id,
      condition: "==",
    });
    getCommentList({
      collectionName: "post",
      whereLeft: "currentPostId",
      whereRight: id,
    });
  }, []);

  return (
    <>
      {postLoading ? (
        <>...Loading</>
      ) : (
        <>
          <Header ir="게시물 상세페이지">
            <PrevBtn />
            <VerticalBtn
              verticalSubmit={() =>
                handleVertical(
                  state.currentUser?.uid,
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
                {postData?.party.participants.map(
                  (participant: string, index: number) => {
                    return (
                      <PartyName
                        key={participant}
                        userId={participant}
                        index={index}
                        length={postData.party.participants?.length}
                      />
                    );
                  }
                )}
              </S.JoinUserNames>
            </S.PostDetailContainer>
            <ul>
              {commentList.map((chatting, i) => {
                return (
                  <OtherUserChatting
                    CreateAt={chatting.CreateAt}
                    writerId={chatting.writerId}
                    chatTxt={chatting.chatTxt}
                    chatId={chatting.chatId}
                  />
                );
              })}
            </ul>
            <Chatting />
          </MainContainer>
        </>
      )}
    </>
  );
}

export default PostDetailPage;
