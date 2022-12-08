import useWriter from '../../../hooks/useGetInfo';
import { PartyNameContainer } from './style';

function PartyName({ userId, length, index }) {
  const { userName, getInfo } = useWriter();
  getInfo(userId);
  return (
    <PartyNameContainer>
      {userName} {length !== index + 1 && '/'}
    </PartyNameContainer>
  );
}

export default PartyName;
