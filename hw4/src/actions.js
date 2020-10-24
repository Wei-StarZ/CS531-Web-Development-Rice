/*
 * action types
 */
export const CHANGE_PASS = "CHANGE_PASS";
export const STORE_ARTICLES = "STORE_ARTICLES"
export const CHANGE_USER = "CHANGE_USER"
export const CHANGE_LOGIN = "CHANGE_LOGIN"
export const SEARCH_ARTICLE = "SEARCH_ARTICLE"
export const STORE_USER = "STORE_USER"
export const STORE_USERDICT = "STORE_USERDICT"
export const STORE_FOLLOWER = "STORE_FOLLOWER"
export const UNFOLLOW = "UNFOLLO"
export const ADD_FOLLOWER = "ADD_FOLLOWER"
export const ADD_ARTICLE = "ADD_ARTICLE"
export const REGISTER_FLAG = "REGISTER_FLAG"
export const CHANGE_PHONE = "CHANGE_PHONE"
export const CHANGE_EMAIL = "CHANGE_EMAIL"
export const CHANGE_ZIP = "CHANGE_ZIP"
/*
 * action creator
 */
export function changePass(password) {
    return {type: CHANGE_PASS, password}
}

export function storeArticles(articles) {
  return {type: STORE_ARTICLES, articles}
}

export function changeUser(username) {
  return {type: CHANGE_USER, username}
}

export function changeLogin(loginpass) {
  return {type: CHANGE_LOGIN, loginpass}
}

export function searchArticle(search) {
  return {type: SEARCH_ARTICLE, search}
}

export function storeUser(user) {
  return {type: STORE_USER, user}
}

export function storeDict(userDict) {
  return {type: STORE_USERDICT, userDict}
}

export function storeFollower(followers) {
  return {type: STORE_FOLLOWER, followers}
}

export function unfollow(follower) {
  return {type: UNFOLLOW, follower}
}

export function addFollower(follower) {
  return {type: ADD_FOLLOWER, follower}
}

export function addArticle(newArticle) {
  return {type: ADD_ARTICLE, newArticle}
}

export function registFlag(registerF) {
  return {type: REGISTER_FLAG, registerF}
}

export function changePhone(phone) {
  return {type: CHANGE_PHONE, phone}
}

export function changeEmail(email) {
  return {type: CHANGE_EMAIL, email}
}

export function changeZip(zipcode) {
  return {type: CHANGE_ZIP, zipcode}
}
