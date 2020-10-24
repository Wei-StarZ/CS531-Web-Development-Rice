import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Landing from './Landing';
import Main from './Main';
import Profile from './Profile';
import { createStore } from 'redux';
import { frontendApp } from './reducer';

import App from './App';
import * as serviceWorker from './serviceWorker';


class Home extends React.Component {
    render() {
        return (
            <div className="landing">
                <div className="landingPage">
                    <Landing/>
                </div>
            </div>
        );
    }
}

const store = createStore(frontendApp);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
          <Router>
              <Switch>
                  <Route exact path={"/"}>
                      <Home />
                  </Route>
                  <Route exact path ={"/Landing"}>
                    <Landing />
                  </Route>
                  <Route exact path ={"/Main"}>
                    <Main />
                  </Route>
                  <Route exact path ={"/Profile"}>
                    <Profile />
                  </Route>
              </Switch>
          </Router>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
