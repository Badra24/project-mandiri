import render_type from "../post";
const initial_state = {
 value : false,
};

function autoReducer(state = initial_state, action)  {
  if (action.type === render_type.RENDER_POST) {
    return {
      ...state,
      value: action.payload.value,   
    };
  
  }
  return state;
}
export default autoReducer;
