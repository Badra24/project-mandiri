import auth_style from "../types";

const initial_state = {
  email: "",
  username: "",
  password: "",
  id: 0,
  full_name: "",
  bio: "",
  avatar_url: "",
  is_verified:"",
};

function auth_Reducer(state = initial_state, action) {
  if (action.type === auth_style.AUTH_LOGIN) {
    return {
      ...state,
      email: action.payload.email,
      username: action.payload.username,
      password: action.payload.password,
      id: action.payload.id,
      full_name: action.payload.full_name,
      bio: action.payload.bio,
      avatar_url : action.payload.avatar_url,
      is_verified : action.payload.is_verified
    };
  } else if (action.type === auth_style.AUTH_LOGOUT) {
    return initial_state;
  }
  return state;
}
export default auth_Reducer;
