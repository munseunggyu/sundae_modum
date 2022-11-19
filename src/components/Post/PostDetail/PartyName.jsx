import { doc, onSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import styled from 'styled-components';
import { db } from '../../../firebase';

const PartyNameContainer = styled.span`
  margin-right: 5px;
`;

function PartyName({ userId, length, index }) {
  const [name, setName] = useState('');
  onSnapshot(doc(db, 'users', userId), (doc) => {
    setName(doc.data().displayName);
  });
  return (
    <PartyNameContainer>
      {name} {length !== index + 1 && '/'}
    </PartyNameContainer>
  );
}

export default PartyName;
