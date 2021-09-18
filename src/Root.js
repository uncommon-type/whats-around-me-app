import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import FetchContextProvider from './contexts/FetchContextProvider';
import GoogleContextProvider from './contexts/GoogleContextProvider';
import ShareLocationContextProvider from './contexts/ShareLocationContextProvider';

import Settings from './SettingsView/components/Settings';
import Footer from './common/components/Footer';
import SearchRoutes from './SearchRoutes';

import './App.css';

const Root = () => {
  return (
    <FetchContextProvider>
      <GoogleContextProvider>
        <ShareLocationContextProvider>
          <Router>
            <div className="app">
              <main>
                <div className="app__inner">
                  <Switch>
                    <Route path="/settings">
                      <Settings />
                      <Footer />
                    </Route>
                    <Route component={SearchRoutes} />
                  </Switch>
                </div>
              </main>
            </div>
          </Router>
        </ShareLocationContextProvider>
      </GoogleContextProvider>
    </FetchContextProvider>
  );
};

export default Root;
