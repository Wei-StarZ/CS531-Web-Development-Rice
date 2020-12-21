import React from 'react';
import { shallow, mount } from 'enzyme';
import {frontendApp} from '../reducer'
import configureStore from 'redux-mock-store';
import Landing from '../Landing';
import Main from '../Main';
import Profile from '../Profile';
import { Provider } from 'react-redux';
import { MemoryRouter } from "react-router-dom";
import {STORE_ALL_ARTICLES, STORE_ARTICLES, CHANGE_USER, REGISTER_FLAG, STORE_FOLLOWER, STORE_USERDICT, STORE_USER, CHANGE_LOGIN, CHANGE_EMAIL, CHANGE_ZIP, CHANGE_PHONE, SEARCH_ARTICLE, CHANGE_COMMENT, ADD_FOLLOWER, UNFOLLOW, CHANGE_PASS, ADD_ARTICLE} from '../actions';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
const mockStore = configureStore([]);
describe('Landing test 1', () => {
  let store;
  store = mockStore({username: "Bret", loginpass: 'Kulas Light', user: {1: ["Leanne Graham", "Bret", "Kulas Light", "Multi-layered client-server neural-net", "Sincere@april.biz", "92998-3874", "1-770-736-8031 x56442", "https://picsum.photos/200/300?random=10"]}});
  const props = {username: "Bret", loginpass: 'Kulas Light', user: {1: ["Leanne Graham", "Bret", "Kulas Light", "Multi-layered client-server neural-net", "Sincere@april.biz", "92998-3874", "1-770-736-8031 x56442", "https://picsum.photos/200/300?random=10"]}};
  it('should log in with registered user', () => {
    const wrapper = mount(<Provider store = {store}><MemoryRouter><Landing key = {1}/></MemoryRouter></Provider>);
    wrapper.find('Landing').find('form').at(1).simulate('submit');
    expect(wrapper.find('Landing').state('login')).toBe(true);
  });
});

describe('Landing test 2', () => {
  let store;
  store = mockStore({username: "kkk", loginpass: 'ccc', user: {1: ["Leanne Graham", "Bret", "Kulas Light", "Multi-layered client-server neural-net", "Sincere@april.biz", "92998-3874", "1-770-736-8031 x56442", "https://picsum.photos/200/300?random=10"]}});
  it('should not log in with unregistered user', () => {
    const wrapper = mount(<Provider store = {store}><MemoryRouter><Landing /></MemoryRouter></Provider>);
    wrapper.find('Landing').find('form').at(1).simulate('submit');
    expect(wrapper.find('Landing').state('login')).toBe(false);
  });
});

describe('Log out test', () => {
  let store;
  var articles = [];
  articles.push("Ervin Howell");
  articles.push('Thu, 31 Mar 2005 20:13:20 GMT');
  articles.push('itaque id aut magnam\npraesentium quia et ea odit et ea voluptas et\nsapiente quia nihil amet occaecati quia id voluptatem\nincidunt ea est distinctio odio');
  articles.push('https://picsum.photos/200/300?random=11');
  articles.push(1112300000000);
  articles.push('Antonette');
  articles.push('1.I love react!  2.Do not like this post. 3. Really love this post! ');
  articles.push("");
  var follower = ["Ervin Howell", "Proactive didactic contingency", "https://picsum.photos/200/300?random=101"];
  store = mockStore({username: 'Bret', loginpass: 'Kulas Light', user: {1: ["Leanne Graham", "Bret", "Kulas Light", "Multi-layered client-server neural-net", "Sincere@april.biz", "92998-3874", "1-770-736-8031 x56442", "https://picsum.photos/200/300?random=10"]},
  tempArticle: articles, followers: follower});
  it('should log out when click log out button', () => {
    const wrapper = mount(<Provider store = {store}><MemoryRouter><Main /></MemoryRouter></Provider>);
    expect(wrapper.find('Main').state('login')).toBe(true);
    wrapper.find('Main').find('button').at(0).simulate('click');
    expect(wrapper.find('Main').state('login')).toBe(false);
  });
});

describe('Profile test', () => {
  let store;
  store = mockStore({username: "Bret"});
  it('should show username on profile page', () => {
    const wrapper = mount(<Provider store = {store}><MemoryRouter><Profile /></MemoryRouter></Provider>);
    expect(wrapper.find('Profile').state('username')).toBe("Bret");
  });
});

const initialState = {
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
describe('authenticate reducer', () => {
  it('returns the initial state', () => {
    expect(frontendApp(undefined, {})).toEqual(initialState);
  });
});

var articles = [];
articles.push("Ervin Howell");
articles.push('Thu, 31 Mar 2005 20:13:20 GMT');
articles.push('itaque id aut magnam praesentium quia et ea odit et ea voluptas et sapiente quia nihil amet occaecati quia id voluptatem incidunt ea est distinctio odio');
articles.push('https://picsum.photos/200/300?random=11');
articles.push(1112300000000);
articles.push('Antonette');
articles.push('1.I love react!  2.Do not like this post. 3. Really love this post! ');
articles.push("");
articles.push("hide");
var allArticles = [];
allArticles.push([...articles]);
var articles2 = [];
articles2.push("kkk CCC");
articles2.push('Thu, 31 Mar 2005 20:13:20 GMT');
articles2.push('itaque id aut magnam praesentium quia et ea odit et ea voluptas et sapiente quia nihil amet occaecati quia id voluptatem incidunt ea est distinctio odio');
articles2.push('https://picsum.photos/200/300?random=11');
articles2.push(1012300000000);
articles2.push('Piggy');
articles2.push('');
articles2.push("1.I love react!  2.Do not like this post. 3. Really love this post! ");
articles2.push("show");
allArticles.push([...articles2]);
const articleState = {
  username: "Antonette",
  articles: [],
  tempArticle: [],
  followers: [["kkk CCC","Multi-layered client-server neural-net","https://picsum.photos/200/300?random=4"]],
  allArticles: allArticles
};
const expectedFetch = {
  username: "Antonette",
  articles: allArticles,
  tempArticle: allArticles,
  followers: [["kkk CCC","Multi-layered client-server neural-net","https://picsum.photos/200/300?random=4"]],
  allArticles: allArticles
};

describe('fetch user articles and articles of follower', () => {
  it('should have article for that user and follower', () => {
    expect(frontendApp(articleState, {type: STORE_ARTICLES})).toEqual(expectedFetch);
  });
});

const expectedFetch2 = {
  username: "Antonette",
  articles: allArticles,
  tempArticle: [articles],
  followers: [],
  allArticles: allArticles
};

const intialState2 = {
  username: "Antonette",
  articles: allArticles,
  tempArticle: allArticles,
  followers: [],
  allArticles: allArticles
};

describe('search articles test', () => {
  it('should only contains specific post', () => {
    expect(frontendApp(intialState2, {type: SEARCH_ARTICLE, search: "Ervin"})).toEqual(expectedFetch2);
  });
});

const initialState3 = {
  username: "Antonette",
  articles: [articles],
  user: {1: ["kkk CCC", "Piggy", "Kulas Light", "Multi-layered client-server neural-net", "Sincere@april.biz", "92998-3874", "1-770-736-8031 x56442", "https://picsum.photos/200/300?random=10"]},
  tempArticle: [articles],
  followers: [],
  allArticles: allArticles
};

describe('add follower test', () => {
  it('should contain articles from that follower', () => {
    expect(frontendApp(initialState3, {type: ADD_FOLLOWER, follower: "Piggy"})["articles"]).toEqual(allArticles);
    expect(frontendApp(initialState3, {type: ADD_FOLLOWER, follower: "jdaoojd"})).toEqual(initialState3);
    expect(frontendApp(initialState3, {type: ADD_FOLLOWER, follower: "kkk CCC"})["articles"]).toEqual(allArticles);
  });
});

const intiialState4 = {
  username: "Antonette",
  articles: allArticles,
  user: {1: ["kkk CCC", "Piggy", "Kulas Light", "Multi-layered client-server neural-net", "Sincere@april.biz", "92998-3874", "1-770-736-8031 x56442", "https://picsum.photos/200/300?random=10"]},
  tempArticle: allArticles,
  followers: [["Piggy","Multi-layered client-server neural-net","https://picsum.photos/200/300?random=4"]],
  allArticles: allArticles
}

describe('unfollow test', () => {
  it('should remove articles from that follower', () => {
    expect(frontendApp(initialState3, {type: UNFOLLOW, follower: "Piggy"})["articles"]).toEqual([articles]);
  });
});

const initialState5 = {
  allArticles: []
}

describe('store all articles test', () => {
  it('should store all the articles from fetch', () => {
    expect(frontendApp(initialState5, {type: STORE_ALL_ARTICLES, allArticles: allArticles})["allArticles"]).toEqual(allArticles);
  });
});

const initialState6 = {
  password: ""
}

describe('change password test', () => {
  it('should change the password', () => {
    expect(frontendApp(initialState5, {type: CHANGE_PASS, password: "wer"})["password"]).toEqual("wer");
  });
});

const initialState7 = {
    tempArticle: [articles]
};
const show = {
  tempArticle: [articles2]
}
describe('show/hide comment test', () => {
  it('comment field should be altered', () => {
    expect(frontendApp(initialState7, {type: CHANGE_COMMENT, id: 1112300000000})["tempArticle"][0][8]).toEqual("show");
    expect(frontendApp(show, {type: CHANGE_COMMENT, id: 1012300000000})["tempArticle"][0][8]).toEqual("hide");
  });
});

const initialState8 = {
    username: ""
};

describe('change user test', () => {
  it('username should be changed', () => {
    expect(frontendApp(initialState7, {type: CHANGE_USER, username: "kkkkk"})["username"]).toEqual("kkkkk");
  });
});

const initialState9 = {
    loginpass: ""
};

describe('change user login password', () => {
  it('login password should be changed', () => {
    expect(frontendApp(initialState7, {type: CHANGE_LOGIN, loginpass: "kkkkk"})["loginpass"]).toEqual("kkkkk");
  });
});

const initialState10 = {
    zipcode: ""
};

describe('change user zipcode', () => {
  it('zipcode should be changed', () => {
    expect(frontendApp(initialState10, {type: CHANGE_ZIP, zipcode: "12345"})["zipcode"]).toEqual("12345");
  });
});

const initialState11 = {
    phone: ""
};

describe('change user phone number', () => {
  it('phone should be changed', () => {
    expect(frontendApp(initialState11, {type: CHANGE_PHONE, phone: "123454567"})["phone"]).toEqual("123454567");
  });
});

const initialState12 = {
    user: {}
};

describe('store user test', () => {
  it('user should be stored', () => {
    var user = {1: ["Leanne Graham", "Bret", "Kulas Light", "Multi-layered client-server neural-net", "Sincere@april.biz", "92998-3874", "1-770-736-8031 x56442", "https://picsum.photos/200/300?random=10"]};
    expect(frontendApp(initialState12, {type: STORE_USER, user: user})["user"]["1"][1]).toEqual("Bret");
  });
});

const initialState13 = {
  email: ""
}
describe('e-mail test', () => {
  it('e-mail should be changed', () => {
    expect(frontendApp(initialState13, {type: CHANGE_EMAIL, email: "1@2"})["email"]).toEqual("1@2");
  });
});

const initialState14 = {
  followers: []
}

describe('store follower test', () => {
  it('follower should be stored', () => {
    var temp = [["Piggy","Multi-layered client-server neural-net","https://picsum.photos/200/300?random=4"]];
    expect(frontendApp(initialState14, {type: STORE_FOLLOWER, followers: temp})["followers"][0][0]).toEqual("Piggy");
  });
});

const initialState15 = {
  registerF: false
}

describe('change flag', () => {
  it('change flag', () => {
    expect(frontendApp(initialState15, {type: REGISTER_FLAG, registerF: true})["registerF"]).toEqual(true);
  });
});

const initialState16 = {
  userDict: {}
}

describe('store user dictionary', () => {
  it('store use dictionary', () => {
    expect(frontendApp(initialState16, {type: STORE_USERDICT, userDict: {"piggy": "666666"}})["userDict"]["piggy"]).toEqual("666666");
  });
});
