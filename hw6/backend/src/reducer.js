import {CHANGE_PASS, CHANGE_PHONE, CHANGE_EMAIL, CHANGE_COMMENT, STORE_TEMP_ARTICLES, CHANGE_ZIP, CHANGE_USER, STORE_ARTICLES, CHANGE_LOGIN, ADD_ARTICLE, REGISTER_FLAG, SEARCH_ARTICLE, STORE_USER, STORE_USERDICT, ADD_FOLLOWER, STORE_FOLLOWER, UNFOLLOW} from "./actions"

const intialState = {
    username: "",
    loginpass: "",
    password: "",
    articles: [],
    tempArticle: [],
    user: {},
    userDict: {},
    followers: [],
    registerF: false,
    phone: "",
    email: "",
    zipcode: "",
    allArticles: []
};

export function frontendApp(state = intialState, action) {
  switch (action.type) {
    // update the tic-tac-toe board
      case STORE_TEMP_ARTICLES:
        return {...state, tempArticle: action.allArticles}
      case CHANGE_PASS:
        return {...state, password: action.password}
      case CHANGE_USER:
        return {...state, username: action.username}
      case STORE_ARTICLES:
        return {...state, articles: action.articles, tempArticle: action.articles}
      case CHANGE_LOGIN:
        return {...state, loginpass: action.loginpass}
      case SEARCH_ARTICLE:
        var temp = [];
        for (var i = 0; i < state.articles.length; ++i) {
          if (state.articles[i][2].includes(action.search) || state.articles[i][0].includes(action.search)) {
            temp.push(state.articles[i]);
          }
        }
        return {...state, tempArticle: temp}
      case STORE_USER:
        return {...state, user: action.user}
      case STORE_USERDICT:
        return {...state, userDict: action.userDict}
      case STORE_FOLLOWER:
        return {...state, followers: action.followers}
      case UNFOLLOW:
        var temp = [];
        for (var i = 0; i < state.followers.length; ++i) {
          if (state.followers[i][0] != action.follower) {
            temp.push([...state.followers[i]]);
          }
        }
        return {...state, followers: temp}
      case REGISTER_FLAG:
        return {...state, registerF: action.registerF}
      case ADD_FOLLOWER:
        var flag = true;
        for (var key in state.user) {
          if (state.user[key][0] == action.follower || state.user[key][1] == action.follower) {
            var temp = [...state.followers];
            var kkk = [];
            kkk.push(action.follower);
            kkk.push(state.user[key][3]);
            var img = "https://picsum.photos/200/300?random=" + Math.floor(Math.random()*100 + 1);
            kkk.push(img);
            temp.push(kkk);
            flag = false;
          }
        }
        if (flag) {
          window.alert("Invalid Follower! ");
          return{...state}
        }
        var tempArt = [...state.articles];
        for (var i = 0; i < state.allArticles.length; ++i) {
          if (state.allArticles[i][0] == action.follower||state.allArticles[i][5] == action.follower) {
            tempArt.push([...state.allArticles[i]]);
          }
        }
        return {...state, followers: temp, articles: tempArt, tempArticle: tempArt}
      case ADD_ARTICLE:
        return {...state, articles: [], tempArticle: []}
      case CHANGE_ZIP:
        return {...state, zipcode: action.zipcode}
      case CHANGE_PHONE:
        return {...state, phone: action.phone}
      case CHANGE_EMAIL:
        return {...state, email: action.email}
      case CHANGE_COMMENT:
        var temp = [...state.tempArticle];
        for (var i = 0; i < state.tempArticle.length; ++i) {
          if (temp[i][4] == action.id) {
            if (temp[i][8] == "Hide Comments") {
              temp[i][8] = "Show Comments";
              var recei = temp[i][6];
              temp[i][6] = [];
              temp[i][7] = recei;
            }
            else {
              temp[i][8] = "Hide Comments";
              var recei = temp[i][7]
              temp[i][6] = recei;
              temp[i][7] = [];
            }
          }
        }
        return {...state, tempArticle: temp}
      default:
        return state;
    }
    return state;
}
