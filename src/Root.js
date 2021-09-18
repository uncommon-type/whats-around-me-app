import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import FetchContextProvider from './contexts/FetchContextProvider';
import GoogleContextProvider from './contexts/GoogleContextProvider';
import ShareLocationContextProvider from './contexts/ShareLocationContextProvider';
import useLocalStorage from './hooks/useLocalStorage';

import Logo from './common/components/Logo';
import Settings from './SettingsView/components/Settings';
import Footer from './common/components/Footer';
import SearchRoutes from './SearchRoutes';

import './App.css';

const Root = () => {
  const [view, setView] = useLocalStorage('view', 'Map');

  const handleSelectView = (view) => {
    setView(view);
  };

  useEffect(() => {
    if (view === 'List' && window.location.pathname === '/') {
      window.history.replaceState({}, '', '/list');
    }
  }, [view]);

  return (
    <FetchContextProvider>
      <GoogleContextProvider>
        <ShareLocationContextProvider>
          <Router>
            <div className="app">
              <main>
                <div className="app__inner">
                  <Logo />
                  <Switch>
                    <Route path="/settings">
                      <Settings onViewChange={handleSelectView} view={view} />
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
