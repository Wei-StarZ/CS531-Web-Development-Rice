import {CHANGE_PASS, CHANGE_PHONE, CHANGE_EMAIL, CHANGE_ZIP, CHANGE_USER, STORE_ARTICLES, CHANGE_LOGIN, ADD_ARTICLE, REGISTER_FLAG, SEARCH_ARTICLE, STORE_USER, STORE_USERDICT, ADD_FOLLOWER, STORE_FOLLOWER, UNFOLLOW} from "./actions"

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
    zipcode: ""
};

export function frontendApp(state = intialState, action) {
  switch (action.type) {
    // update the tic-tac-toe board
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
        var temp = [...state.followers];
        var kkk = [];
        kkk.push(action.follower);
        kkk.push("I love react");
        var img = "https://picsum.photos/200/300?random=" + Math.floor(Math.random()*100 + 1);
        kkk.push(img);
        temp.push(kkk);
        return {...state, followers: temp}
      case ADD_ARTICLE:
        var temp = [];
        var kkk = [];
        var img = "https://picsum.photos/200/300?random=" + Math.floor(Math.random() * 100 + 1);
        var time = new Date();
        kkk.push("Radnom Thorau");
        kkk.push(time.toUTCString());
        kkk.push(action.newArticle);
        kkk.push(img);
        kkk.push(time.getTime());
        temp.push(kkk);
        for (var i = 0; i < state.articles.length; ++i) {
          temp.push([...state.articles[i]]);
        }
        var temp2 = [];
        for (var i = 0; i < temp.length; ++i) {
          temp2.push([...temp[i]]);
        }
        return {...state, articles: temp, tempArticle: temp2}
      case CHANGE_ZIP:
        return {...state, zipcode: action.zipcode}
      case CHANGE_PHONE:
        return {...state, phone: action.phone}
      case CHANGE_EMAIL:
        return {...state, email: action.email}
      default:
        return state;
    }
    return state;
}
