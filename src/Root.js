import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import FetchContextProvider from './contexts/FetchContextProvider';
import GoogleContextProvider from './contexts/GoogleContextProvider';
import ShareLocationContextProvider from './contexts/ShareLocationContextProvider';

import Nav from './components/Nav';
import Settings from './components/Settings';
import SearchRoutes from './SearchRoutes';

import './App.css';

const Root = () => {
  return (
    <FetchContextProvider>
      <GoogleContextProvider>
        <ShareLocationContextProvider>
          <Router>
            <div className="app">
              <Switch>
                <Route path="/settings">
                  <Settings />
                </Route>
                <Route>
                  <SearchRoutes />
                </Route>
              </Switch>
              <Nav />
            </div>
          </Router>
        </ShareLocationContextProvider>
      </GoogleContextProvider>
    </FetchContextProvider>
  );
};

export default Root;
