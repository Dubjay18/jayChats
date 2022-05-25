import * as actions from "./actionTypes/newUser";

const initialUser = {
  userName: null,
  image: null,
  token: null,
  entry: false,
};

export function user(state = initialUser, action) {
  switch (action.type) {
    case actions.SET_USERNAME:
      return Object.assign({}, state, { userName: action.userName });
    case actions.SET_IMAGE:
      return Object.assign({}, state, { image: action.image });
    case actions.SET_TOKEN:
      return Object.assign({}, state, { token: action.token });
    case actions.SET_ENTRY:
      return Object.assign({}, state, { entry: action.entry });
    default:
      return state;
  }
}
