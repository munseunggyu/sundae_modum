import { FIRST_SET_USER, SET_PHOTO_URL, SET_USER } from "./types";

export function setUser(user){
  return {
    type:SET_USER,
    payload:user
  }
}

export function setPhotoURL(photoURL){
  return{
    type:SET_PHOTO_URL,
    payload:photoURL
  }
}

export function setTest(test){
  return{
    type:'TEST',
    payload:test
  }
}

export function firstSetUser(user){
  return{
    type:FIRST_SET_USER,
    payload:user
  }
}