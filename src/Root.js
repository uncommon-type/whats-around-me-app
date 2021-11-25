import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import useLocalStorage from './hooks/useLocalStorage';

import { AppProviders } from './contexts';

import Map from './MapView/components/Map/Map';
import CardList from './ListView/components/CardList';
import Settings from './SettingsView/components/Settings/Settings';
import Logo from './common/components/Logo/Logo';
import Footer from './common/components/Footer/Footer';
import FooterWithSearchBar from './common/components/Footer/FooterWithSearchBar';

import './App.css';

const Root = () => {
  const [view, setView] = useLocalStorage('view', 'Map');

  const handleSelectView = (view) => {
    setView(view);
  };

  return (
    <AppProviders>
      <div className="app">
        <main>
          <div className="app__inner">
            <Logo />
            <Switch>
              <Route path="/" exact>
                {view === 'Map' ? (
                  <>
                    <Map />
                    <FooterWithSearchBar />
                  </>
                ) : (
                  <Redirect to="/list" />
                )}
              </Route>
              <Route path="/map">
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
