import { SET_CURRENT_POST } from "./types";

export function setCurrentPost(post){
  return{
    type:SET_CURRENT_POST,
    payload:post
  }
}