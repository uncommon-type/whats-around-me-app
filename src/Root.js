import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import FetchContextProvider from './contexts/FetchContextProvider';
import GoogleContextProvider from './contexts/GoogleContextProvider';
import ShareLocationContextProvider from './contexts/ShareLocationContextProvider';

import Nav from './components/Nav';
import Map from './components/Map/Map';
import CardList from './components/CardList';
import Settings from './components/Settings';
import Help from './components/Help';

import './App.css';

const Root = () => (
  <FetchContextProvider>
    <GoogleContextProvider>
      <ShareLocationContextProvider>
        <Router>
          <div className="app">
            <Switch>
              <Route path="/" exact component={Map} />
              <Route path="/list" component={CardList} />
              <Route path="/settings" component={Settings} />
              <Route path="/help" component={Help} />
            </Switch>
            <Nav />
          </div>
        </Router>
      </ShareLocationContextProvider>
    </GoogleContextProvider>
  </FetchContextProvider>
);

export default Root;
