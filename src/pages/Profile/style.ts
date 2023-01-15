import styled from "styled-components";
import fileImg from "../../assets/img-file-button.png";

export const ProfileContainer = styled.section`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #dbdbdb;
`;

export const UserProfileImg = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
`;
export const UserProfileEditBtn = styled.button`
  border: 1px solid #dbdbdb;
  padding: 5px 10px;
  border-radius: 22px;
  width: 120px;
`;
export const UserName = styled.strong`
  font-weight: 700;
  font-size: 16px;
`;
export const UserIntroduce = styled.p`
  width: 250px;
  text-align: center;
`;
export const MyPost = styled.p`
  margin-top: 20px;
  text-align: center;
`;
export const MyPostUl = styled.ul`
  margin-top: 10px;
`;

// FristProfile style

export const EditFormConatiner = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  padding: 20px;
`;
export const UserProfilImgContainer = styled.div`
  position: relative;
  cursor: pointer;
`;
export const FileIcon = styled.div`
  position: absolute;
  bottom: 0;
  width: 50px;
  height: 50px;
  right: -20px;
  background: url(${fileImg}) center/cover;
`;
export const FileInput = styled.input`
  display: none;
`;
export const EditLabel = styled.label`
  align-self: flex-start;
  margin-top: 20px;
  font-weight: 500;
  color: #767676;
  margin-bottom: 10px;
`;
export const EditInput = styled.input`
  border: 0;
  border-bottom: 1px solid #dbdbdb;
  width: 100%;
  outline: none;
`;
