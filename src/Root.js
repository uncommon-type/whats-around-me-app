import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import useLocalStorage from './hooks/useLocalStorage';

import { AppProviders } from './contexts';
import Logo from './common/components/Logo';
import Map from './MapView/components/Map';
import CardList from './ListView/components/CardList';
import Settings from './SettingsView/components/Settings';
import Footer from './common/components/Footer';
import FooterWithSearchBar from './common/components/FooterWithSearchBar';

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
    <AppProviders>
      <div className="app">
        <main>
          <div className="app__inner">
            <Logo />
            <Switch>
              <Route path="/" exact>
                <Map />
                <FooterWithSearchBar />
              </Route>
              <Route path="/list">
                <CardList />
                <FooterWithSearchBar />
              </Route>
              <Route path="/settings">
                <Settings onViewChange={handleSelectView} view={view} />
                <Footer />
              </Route>
            </Switch>
          </div>
        </main>
      </div>
    </AppProviders>
  );
};

export default Root;
