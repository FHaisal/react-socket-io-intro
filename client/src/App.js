import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './config/store';

import {GlobalStyle} from "./styles/globals";
import ChatPage from './components/ChatPage';
import NamePage from './components/NamePage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <GlobalStyle />

          <Route exact path={'/'} component={NamePage}/>
          <Route exact path={'/chat'} component={ChatPage}/>

        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
