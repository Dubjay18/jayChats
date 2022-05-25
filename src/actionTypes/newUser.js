export const SET_USERNAME = "SET_USER";
export const SET_IMAGE = "SET_IMAGE";
export const SET_TOKEN = "SET_TOKEN";
export const SET_ENTRY = "SET_ENTRY";

export function setUsername(userName) {
  return {
    type: SET_USERNAME,
    userName,
  };
}

export function setImage(image) {
  return {
    type: SET_IMAGE,
    image,
  };
}

export function setToken(token) {
  return {
    type: SET_TOKEN,
    token,
  };
}

export function setEntry(entry) {
  return {
    type: SET_ENTRY,
    entry,
  };
}
