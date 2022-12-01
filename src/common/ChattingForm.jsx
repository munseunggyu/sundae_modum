import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useRef } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import arrow from '../assets/arrow-left.png';
import { db } from '../firebase';

const ChattingFormContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const ChattingForm = styled.form`
  position: fixed;
  bottom: 0;
  max-width: 450px;
  width: 100%;
`;
const ChattingInput = styled.input`
  outline: none;
  width: 100%;
  font-size: 16px;
  padding: 15px 30px 15px 15px;
  border: 0;
  border-top: 0.5px solid #dbdbdb;
`;

const ChattingSubmitBtn = styled.button`
  position: absolute;
  right: 10px;
  background: url(${arrow});
  transform: rotateY(180deg);
  width: 22px;
  height: 22px;
  top: 15px;
`;

function Chatting() {
  const currentPost = useSelector((state) => state.post.currentPost);
  const scrollRef = useRef(null);
  const userInfo = useSelector((state) => state.user.currentUser);
  const { id } = useParams();
  const [chatTxt, setChatTxt] = useState('');
  // 게시글 댓글 작성 기능
  const handleChattingSend = async (e) => {
    e.preventDefault();
    if (chatTxt) {
      const postChatting = collection(db, 'post_chatting');
      const newId = doc(collection(postChatting, id, 'post'));
      await Promise.all([
        setDoc(newId, {
          chatId: newId.id,
          currentPostId: id,
          CreateAt: serverTimestamp(),
          chatTxt,
          writerId: userInfo.uid,
        }),
      ]);
      setChatTxt('');
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div ref={scrollRef} />
      <ChattingFormContainer>
        <ChattingForm onSubmit={handleChattingSend}>
          <ChattingInput
            type="text"
            placeholder="메시지를 입력하세요."
            value={chatTxt}
            onChange={(e) => setChatTxt(e.target.value)}
          />
          <ChattingSubmitBtn onClick={handleChattingSend} />
        </ChattingForm>
      </ChattingFormContainer>
    </>
  );
}

export default Chatting;
