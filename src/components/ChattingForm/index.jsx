import { serverTimestamp } from "firebase/firestore";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import useSubmitChat from "../../hooks/useSubmitChat";
import * as S from "./style";

function Chatting() {
  const scrollRef = useRef(null);
  const userInfo = useSelector((state) => state.user.currentUser);
  const { id } = useParams();
  const {
    chat: comment,
    setChat: sentComment,
    sendChat: sendComment,
  } = useSubmitChat();
  // 게시글 댓글 작성 기능
  const handleChattingSend = async (e) => {
    e.preventDefault();
    const data = {
      currentPostId: id,
      CreateAt: serverTimestamp(),
      chatTxt: comment,
      writerId: userInfo.uid,
    };
    if (comment) {
      sendComment("post_chatting", id, "post", data);
      scrollRef.current.scrollIntoView({
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
