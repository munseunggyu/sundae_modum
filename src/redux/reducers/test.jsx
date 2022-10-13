

export default function(state=[],action){
  switch(action.type){
    case 'TEST':
      return {...state,currentUser: action.payload,isLoading:false}
    default:
      return state
  }
}