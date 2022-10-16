import { CLEAR_CURRENT_POST, SET_CURRENT_POST } from "./types";

export function setCurrentPost(post){
  return{
    type:SET_CURRENT_POST,
    payload:post
  }
}

export function clearCurrentPost(){
  return{
    type:CLEAR_CURRENT_POST
  }
}