import { serverTimestamp } from "firebase/firestore";
import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

import useSubmitChat from "../../hooks/useSubmitChat";
import * as S from "./style";

function Chatting() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const { state } = useAuthContext();
  const { id } = useParams();
  const {
    chat: comment,
    setChat: sentComment,
    sendChat: sendComment,
  } = useSubmitChat();
  // 게시글 댓글 작성 기능
  const handleChattingSend = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      currentPostId: id,
      CreateAt: serverTimestamp(),
      chatTxt: comment,
      writerId: state.currentUser?.uid,
    };
    if (comment) {
      if (!scrollRef?.current) return;
      sendComment({
        collectionName1: "post_chatting",
        id: id,
        collectionName2: "post",
        data: data,
      });
      scrollRef?.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      sentComment("");
    }
  };

  return (
    <>
      <S.ChattingFormContainer>
        <S.ChattingForm onSubmit={handleChattingSend}>
          <S.ChattingInput
            type="text"
            placeholder="메시지를 입력하세요."
            value={comment}
            onChange={(e) => sentComment(e.target.value)}
          />
          <S.ChattingSubmitBtn onClick={handleChattingSend} />
        </S.ChattingForm>
      </S.ChattingFormContainer>
      <div ref={scrollRef} />
    </>
  );
}

export default Chatting;
