import styled from "styled-components";
import verticalIcon from "../../../assets/icons/icon-more-vertical.png";

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
export const PostDetailContainer = styled.section`
  padding: 10px 12px 0;
  margin-bottom: 10px;
  border-bottom: 1px solid #c4c4c4;
`;
export const DeadLine = styled.span`
  display: block;
  margin-top: 20px;
  font-size: 12px;
  opacity: 0.7;
`;
export const ContentsTitle = styled.strong`
  display: block;
  margin: 10px 0;
  font-weight: 600;
  font-size: 18px;
`;
export const ContentsTxt = styled.pre`
  font-size: 16px;
  margin-bottom: 20px;
  line-height: 1.4;
  white-space: -moz-pre-wrap; /* Mozilla, supported since 1999 */
  white-space: -pre-wrap; /* Opera */
  white-space: -o-pre-wrap;
  white-space: pre-wrap;
  word-wrap: break-word;
`;
export const ContentsImg = styled.img`
  width: 80%;
  border-radius: 44px;
  padding-bottom: 20px;
  display: block;
  margin: 0 auto;
`;
export const JoinUserNames = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

export const JoinBtn = styled.button`
  width: 80px;
  padding: 10px 0;
  color: white;
  background-color: #6bb4d3;
  border-radius: 11px;
  margin-right: 8px;
`;

export const JoinSpan = styled.span`
  font-size: 18px;
  margin-top: 5px;
`;
export const JoinConatiner = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;
export const JoinUserIcon = styled.img`
  width: 20px;
  height: 20px;
`;

// otherUser
export const OtherUserChatContainer = styled.li`
  width: 100%;
  padding: 12px;
  border-bottom: 0.5px solid #c4c4c4;
  border-top: 0.5px solid #c4c4c4;
  margin-bottom: 10px;
  background-color: ${(props) => (props.bgc ? "#bdbdbd" : "white")};
  &:first-child {
    border-top: 0;
  }
  &:last-child {
    border-bottom: 0;
  }
`;
export const OtherTxt = styled.p`
  margin: 10px 0;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  white-space: pre-wrap;
  word-wrap: break-word;
`;
export const OtherTime = styled.span`
  opacity: 0.7;
  font-size: 14px;
`;
export const VerticalBtn = styled.button`
  background-image: url(${verticalIcon});
  width: 22px;
  height: 22px;
  margin-left: auto;
`;

// party

export const PartyNameContainer = styled.span`
  margin-right: 5px;
`;
