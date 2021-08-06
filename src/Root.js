import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Map from './components/Map';
import CardList from './components/CardList';
import Settings from './components/Settings';
import Help from './components/Help';
import Nav from './components/Nav';

import './App.css';

const Root = () => {
  return (
    <Router>
      <div className="app">
        <main className="app__content">
          <Switch>
            <Route path="/" exact component={Map} />
            <Route path="/list" component={CardList} />
            <Route path="/settings" component={Settings} />
            <Route path="/help" component={Help} />
          </Switch>
        </main>
        <Nav />
      </div>
    </Router>
  );
};

export default Root;
