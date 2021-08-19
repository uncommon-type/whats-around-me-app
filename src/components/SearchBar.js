import React, { useState, useContext } from 'react';

import { SearchIcon } from '@heroicons/react/solid';

import { FetchContext } from '../contexts/FetchContextProvider';
import { GoogleContext } from '../contexts/GoogleContextProvider';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isError, setIsError] = useState(false);
  const { setCenterCoords } = useContext(FetchContext);
  const { mapInstance, mapApi } = useContext(GoogleContext);

  const callGooglePlaces = (query) => {
    const request = {
      query,
      fields: ['name', 'place_id', 'geometry', 'formatted_address', 'icon'],
    };

    const service = new mapApi.places.PlacesService(mapInstance);

    service.findPlaceFromQuery(request, (results, status) => {
      if (status === mapApi.places.PlacesServiceStatus.OK) {
        setIsError(false);
        setCenterCoords({
          lat: results[0].geometry.location?.lat(),
          lng: results[0].geometry.location?.lng(),
        });
      }
      if (status !== mapApi.places.PlacesServiceStatus.OK) {
        setIsError(true);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.elements.query.value === '') {
      return;
    }
    setQuery(e.target.elements.query.value);
    callGooglePlaces(query);
  };

  const handleChange = (e) => {
    setQuery(e.currentTarget.value);
    if (e.currentTarget.value === '') {
      setIsError(false);
    }
  };

  return (
    <form className="search-controls" onSubmit={handleSubmit}>
      <label htmlFor="search" className="visually-hidden">
        Search locations
      </label>
      <div className="search-controls__inner">
        <input
          value={query}
          onChange={handleChange}
          type="text"
          name="query"
          id="query"
          placeholder="Search"
          aria-label="Search for location"
        />
        <button type="submit" aria-label="Submit search">
          <span className="visually-hidden">Search</span>
          <SearchIcon className="icon-search" focusable="false" />
        </button>
      </div>
      {isError ? (
        <aside className="search-controls__error">
          <h2>Not found</h2>
        </aside>
      ) : null}
    </form>
  );
};

export default SearchBar;
