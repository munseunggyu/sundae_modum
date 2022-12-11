import { deleteDoc, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import {
  OtherTime,
  OtherTxt,
  OtherUserChatContainer,
  UserContainer,
  UserName,
  UserProfileImg,
  VerticalBtn,
} from './style';
import userProfile from '../../../assets/user-profile.png';
import { db } from '../../../firebase';
import { useParams } from 'react-router-dom';
import getDate from '../../../utils/getDate';
import handleVertical from '../../../utils/handleVertical';
import useWriter from '../../../hooks/useGetInfo';

function OtherUserChatting({ CreateAt, writerId, chatTxt, chatId }) {
  const { id } = useParams();
  const time = getDate(CreateAt);
  const userInfo = useSelector((state) => state.user.currentUser);
  const { userName, userPhotoURL, getInfo } = useWriter();
  getInfo(writerId);

  const delChatting = async () => {
    // 채팅 삭제
    const postChatDoc = doc(db, 'post_chatting', id);
    await deleteDoc(doc(postChatDoc, 'post', chatId));
  };
  // DM의 같은 ID 값을 유지해주기 위해서
  const CreateDMRoomId = (selectUser) => {
    return userInfo.uid > selectUser
      ? `${selectUser}${userInfo.uid}`
      : `${userInfo.uid}${selectUser}`;
  };
  const setDM = () => {
    const dmid = CreateDMRoomId(writerId); // DM방 생성
    const dmRoom = doc(db, 'DMROOMS', dmid);

    //[방 생성자id,상대방id ]데이터 넣어준 후 DM방 데이터 가져올 시 [클릭한 유저]가 있는 list만 가져온다.
    setDoc(dmRoom, {
      id: dmid,
      CreateAt: serverTimestamp(),
      ids: [writerId, userInfo.uid],
    });
  };
  return (
    <OtherUserChatContainer bgc={writerId === userInfo.uid}>
      <UserContainer>
        <UserProfileImg src={userPhotoURL || userProfile} alt="유저 프로필" />
        <UserName>{userName}</UserName>
        <VerticalBtn
          type="button"
          onClick={() => {
            handleVertical(
              userInfo.uid,
              writerId,
              '댓글을 삭제하시겠습니까?',
              delChatting,
              '쪽지를 보내겠습니까?',
              setDM
            );
          }}
        />
      </UserContainer>
      <OtherTxt>{chatTxt}</OtherTxt>
      <OtherTime>{time}</OtherTime>
    </OtherUserChatContainer>
  );
}

export default OtherUserChatting;
