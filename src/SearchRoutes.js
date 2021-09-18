import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Map from './components/Map/Map';
import CardList from './components/CardList/CardList';
import SearchBar from './components/Header/SearchBar';
import Header from './components/Header/Header';

const SearchRoutes = () => {
  return (
    <>
      <Header>
        <SearchBar />
      </Header>
      <Route path="/" exact component={Map} />
      <Route path="/list" component={CardList} />
    </>
  );
};

export default SearchRoutes;
