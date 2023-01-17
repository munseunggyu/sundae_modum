import userProfile from "../../../assets/user-profile.png";
import { useNavigate } from "react-router-dom";
import partyUser from "../../../assets/icons/icon-user.png";
import * as S from "./style";
import useGetInfo from "../../../hooks/useGetInfo";
import { useEffect } from "react";
import { IPost } from "../../../types/post";

function PostList({
  party,
  postkey,
  postImg,
  postDate,
  postTime,
  postTit,
  writerId,
}: IPost) {
  const navigate = useNavigate();
  const { userName, userPhotoURL, getInfo } = useGetInfo();

  const handleClick = async () => {
    navigate(`/postdetail/${postkey}`);
  };

  useEffect(() => {
    getInfo(writerId);
  }, []);
  return (
    <S.Postli>
      <S.PostBtn onClick={handleClick}>
        <div>
          <S.PostContentContainer>
            <S.UserProfileImg
              src={userPhotoURL || userProfile}
              alt="유저 프로필"
            />
            <S.PostTextContainer>
              <S.UserName>{userName}</S.UserName>
              <strong>{postTit}</strong>
              <S.PostTextBottomContainer>
                <span>
                  {postDate} {postTime}
                </span>
                <S.PartyContainer>
                  <S.PartyUser src={partyUser} alt="" />
                  <strong>{party?.participateCount}</strong>
                </S.PartyContainer>
              </S.PostTextBottomContainer>
            </S.PostTextContainer>
          </S.PostContentContainer>
        </div>
        {postImg && <S.PostImg src={postImg} alt="" />}
      </S.PostBtn>
    </S.Postli>
  );
}

export default PostList;
