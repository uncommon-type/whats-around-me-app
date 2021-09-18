import React from 'react';
import { Route } from 'react-router-dom';

import Map from './MapView/components/Map';
import CardList from './ListView/components/CardList';
import SearchBar from './common/components/SearchBar';
import Footer from './common/components/Footer';

const SearchRoutes = () => {
  return (
    <>
      <Route path="/" exact component={Map} />
      <Route path="/list" component={CardList} />
      <Footer>
        <SearchBar />
      </Footer>
    </>
  );
};

export default SearchRoutes;
