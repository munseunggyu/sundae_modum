import { doc, onSnapshot } from "firebase/firestore";
import { useState } from "react";
import styled from "styled-components";
import { db } from "../../../firebase";

const PartyNameContainer = styled.span`
margin-right:5px;
`;


function PartyName({id}){
  const [name,setName] = useState('')
  onSnapshot(doc(db, "users", id), (doc) => {
    setName(doc.data().displayName)
  })
  return(
    <PartyNameContainer>
      {name}
    </PartyNameContainer>
  )
}

export default PartyName