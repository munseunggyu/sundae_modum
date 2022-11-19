import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Header from "../../../common/Header";
import { MainContainer } from "../../../common/MainContainer";
import userProfile from "../../../assets/user-profile.png";
import partyUser from "../../../assets/icons/icon-user.png";
import OtherUserChatting from "./OtherUserChatting";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
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
} from "firebase/firestore";
import { db } from "../../../firebase";
import { setCurrentPost } from "../../../redux/actions/post_action";
import Chatting from "../../../common/ChattingForm";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import PartyName from "./PartyName";
import { IrH2 } from "../../../common/TextHide";

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;
export const UserProfileImg = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
`;
export const UserName = styled.span`
  font-weight: 500;
`;
const PostDetailContainer = styled.section`
  padding: 10px 12px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #c4c4c4;
`;
const DeadLine = styled.time`
  display: block;
  margin-top: 20px;
  font-size: 12px;
  opacity: 0.7;
`;
const ContentsTitle = styled.strong`
  display: block;
  margin: 10px 0;
  font-weight: 600;
  font-size: 18px;
`;
const ContentsTxt = styled.pre`
  font-size: 16px;
  margin-bottom: 20px;
  line-height: 1.4;
`;
const ContentsImg = styled.img`
  width: 100%;
  height: 350px;
  border-radius: 44px;
  padding-bottom: 20px;
  display: block;
  margin: 0 auto;
`;
const JoinUserNames = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const JoinBtn = styled.button`
  width: 80px;
  padding: 10px 0;
  color: white;
  background-color: #6bb4d3;
  border-radius: 11px;
  margin-right: 8px;
`;

const JoinSpan = styled.span`
  font-size: 18px;
  margin-top: 5px;
`;
const JoinConatiner = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;
const JoinUserIcon = styled.img`
  width: 20px;
  height: 20px;
`;

function PostDetailPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  console.log(id);
  const currentPost = useSelector((state) => state.post);
  const userInfo = useSelector((state) => state.user.currentUser);
  const [chattings, setChattings] = useState([]);
  const [writerName, setWriterName] = useState("");
  const [writerPhotoURL, setWriterPhotoURL] = useState("");
  // console.log(currentPost.currentPost)
  // 댓글 불러오기
  const getChatting = (id) => {
    try {
      const q = query(
        collectionGroup(db, "post"),
        where("currentPostId", "==", id),
        orderBy("CreateAt", "asc")
      );
      // const querySnapshot = await getDocs(q);
      onSnapshot(q, (querySnapshot) => {
        const newChatting = querySnapshot.docs.map((doc) => {
          return doc.data({ serverTimestamps: "estimate" });
        });
        setChattings(newChatting);
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getCurrentPost = () => {
    // 사용자에게 정보를 빠르게 보여주기 위해 실시간 업데이트 수신 대기 함수 사용
    const currentPostRef = doc(db, "current_post", userInfo.uid);
    const currentPostSnap = onSnapshot(currentPostRef, (currentPostDoc) => {
      // 프로필 편집 이후에도 사용자의 닉네임과 프로필사진을 적용해주기위해
      onSnapshot(doc(db, "users", currentPostDoc.data().writerId), (doc) => {
        setWriterName(doc.data().displayName);
        setWriterPhotoURL(doc.data().photoURL);
      });
      dispatch(setCurrentPost(currentPostDoc.data()));
      getChatting(currentPostDoc.data().postkey);
    });
  };

  // 참여하기 버튼 기능
  const handlePartyBtn = async () => {
    // 이미 참여하고있으면 return해 준다.
    const included = currentPost.currentPost.party.participants.find(
      (participant) => participant === userInfo.uid
    );
    if (included) return;
    const newParty = {
      ...currentPost.currentPost.party,
      participants: [
        ...currentPost.currentPost.party.participants,
        userInfo.uid,
      ],
      participateCount: currentPost.currentPost.party.participants.length + 1,
    };
    const currentPostRef = doc(db, "current_post", userInfo.uid);
    await updateDoc(currentPostRef, {
      party: newParty,
    });
    const postRef = doc(db, "posts", currentPost.currentPost.postkey);
    await updateDoc(postRef, {
      party: newParty,
    });
    console.log("완료");
  };
  // 참여 취소하기 버튼 기능
  const handlePartyCanCelBtn = async () => {
    const included = currentPost.currentPost.party.participants.find(
      (participant) => participant === userInfo.uid
    );
    if (!included) return;
    const cancel = currentPost.currentPost.party.participants.filter(
      (v) => v !== userInfo.uid
    );
    const newParty = {
      ...currentPost.currentPost.party,
      participants: [...cancel],
      participateCount: currentPost.currentPost.party.participants.length - 1,
    };
    const currentPostRef = doc(db, "current_post", userInfo.uid);
    await updateDoc(currentPostRef, {
      party: newParty,
    });
    const postRef = doc(db, "posts", currentPost.currentPost.postkey);
    await updateDoc(postRef, {
      party: newParty,
    });
    console.log("완료");
  };

  const delPost = async () => {
    await deleteDoc(doc(db, "posts", currentPost.currentPost.postkey));
    navigate("/");
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
    const dmRoom = doc(db, "DMROOMS", dmid);

    //[방 생성자id,상대방id ]데이터 넣어준 후 DM방 데이터 가져올 시 [클릭한 유저]가 있는 list만 가져온다.
    setDoc(dmRoom, {
      id: dmid,
      CreateAt: serverTimestamp(),
      ids: [otherUser, userInfo.uid],
    });
  };

  const verticalSubmit = (e) => {
    e.preventDefault();
    if (userInfo.uid === currentPost.currentPost.writerId) {
      confirmAlert({
        title: "게시글을 삭제하시겠습니까?",
        buttons: [
          {
            label: "확인",
            onClick: () => {
              delPost();
            },
          },
          {
            label: "취소",
          },
        ],
      });
    } else {
      confirmAlert({
        title: "쪽지를 보내겠습니까?",
        buttons: [
          {
            label: "확인",
            onClick: () => {
              setDM(currentPost.currentPost.writerId);
              console.log("DM방 생성");
            },
          },
          {
            label: "취소",
          },
        ],
      });
    }
  };

  useEffect(() => {
    getCurrentPost();
  }, []);
  return (
    <>
      {currentPost.isLoding ? (
        <>...Loding</>
      ) : (
        <>
          <Header
            ir="게시물 상세페이지"
            prv={true}
            vertical={true}
            verticalSubmit={verticalSubmit}
          />
          <MainContainer pr="0">
            <PostDetailContainer>
              <IrH2>게시글 콘텐츠</IrH2>
              <UserContainer>
                <UserProfileImg
                  src={writerPhotoURL || userProfile}
                  alt="유저 프로필"
                />
                <UserName>{writerName} </UserName>
              </UserContainer>
              <DeadLine>
                {currentPost.currentPost.postDate}{" "}
                {currentPost.currentPost.postTime} 까지 모집
              </DeadLine>
              <ContentsTitle>{currentPost.currentPost.postTit}</ContentsTitle>
              <ContentsTxt>{currentPost.currentPost.postTxt}</ContentsTxt>
              {currentPost.currentPost.postImg && (
                <ContentsImg src={currentPost.currentPost.postImg} alt="" />
              )}
              <JoinConatiner>
                <JoinBtn onClick={handlePartyBtn}>참여하기</JoinBtn>
                <JoinBtn onClick={handlePartyCanCelBtn}>취소하기</JoinBtn>
                <JoinUserIcon src={partyUser} alt="" />
                <JoinSpan>
                  {" "}
                  {currentPost.currentPost.party.participateCount}
                </JoinSpan>
              </JoinConatiner>
              <JoinUserNames>
                {currentPost.currentPost.party.participants.map(
                  (participant, index) => (
                    <PartyName
                      key={participant}
                      id={participant}
                      index={index}
                      length={currentPost.currentPost.party.participants.length}
                    />
                  )
                )}
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
