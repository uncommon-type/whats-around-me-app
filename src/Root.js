import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import useLocalStorage from "./hooks/useLocalStorage";

import { AppProviders } from "./contexts";

import Logo from "./common/components/Logo/Logo";
import Map from "./MapView/components/Map/Map";
import CardList from "./ListView/components/CardList";
import Settings from "./SettingsView/components/Settings/Settings";
import Footer from "./common/components/Footer/Footer";

import "./App.css";

const Root = () => {
  const [view, setView] = useLocalStorage("view", "Map");

  const handleSelectView = (view) => {
    setView(view);
  };

  return (
    <AppProviders>
      <main>
        <div className="app__inner">
          <Logo />
          <Switch>
            <Route path="/" exact>
              {view === "Map" ? <Map /> : <Redirect to="/list" />}
            </Route>
            <Route path="/map">
              <Map />
            </Route>
            <Route path="/list">
              <CardList />
            </Route>
            <Route path="/settings">
              <Settings onViewChange={handleSelectView} view={view} />
            </Route>
          </Switch>
          <Footer />
        </div>
      </main>
    </AppProviders>
  );
};

export default Root;
