import styled from 'styled-components';
import fileImg from '../../../assets/img-file-button.png';

export const TextArea = styled.textarea`
  width: 100%;
  border: 0;
  outline: none;
  resize: none;
`;
export const DeadlineContainer = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;
export const CountInput = styled.input`
  display: block;
  margin: 0 auto;
  margin-bottom: 20px;
`;
export const TitInput = styled.input`
  width: 100%;
  border: 0;
  border-bottom: 1px solid gray;
  outline: none;
  margin-bottom: 10px;
  font-size: 16px;
`;
export const FileBtn = styled.button`
  position: fixed;
  bottom: 70px;
  width: 50px;
  height: 50px;
  right: 10px;
  background: url(${fileImg}) center/cover;
`;
export const FileInput = styled.input`
  display: none;
`;
export const FileContainer = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
`;
export const FileImg = styled.img`
  width: 100%;
  height: 100%;
`;
export const FileCloseBtn = styled.button`
  position: absolute;
  right: 0;
  width: 20px;
  height: 20px;
  background-color: black;
  color: white;
`;
