import { doc, onSnapshot } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../../firebase';
import { PartyNameContainer } from './style';

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
