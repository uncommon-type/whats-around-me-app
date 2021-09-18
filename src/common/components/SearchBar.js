import React, { useState, useContext } from 'react';

import { SearchIcon } from '@heroicons/react/solid';

import { FetchContext } from '../../contexts/FetchContextProvider';
import { GoogleContext } from '../../contexts/GoogleContextProvider';
import { ShareLocationContext } from '../../contexts/ShareLocationContextProvider';

import GeoLocationButton from './GeoLocationButton';
import NotFound from './NotFound';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [isError, setIsError] = useState(false);
  const { setCenterCoords } = useContext(FetchContext);
  const { mapInstance, mapApi, ready } = useContext(GoogleContext);

  const {
    isWatchingLocation,
    handleSharing,
    handleStopSharing,
    geolocationError,
  } = useContext(ShareLocationContext);

  const callGooglePlaces = async (query) => {
    const request = {
      query,
      fields: ['name', 'geometry'],
    };

    if (ready) {
      new mapApi.places.PlacesService(mapInstance).findPlaceFromQuery(
        request,
        (results, status) => {
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
        },
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target.elements.query.value === '') {
      return;
    }
    setQuery(e.target.elements.query.value);
    await callGooglePlaces(query);
  };

  const handleChange = (e) => {
    setQuery(e.currentTarget.value);
    if (e.currentTarget.value === '') {
      setIsError(false);
    }
  };

  return (
    <div>
      <GeoLocationButton
        handleSharing={handleSharing}
        isWatchingLocation={isWatchingLocation}
        handleStopSharing={handleStopSharing}
        geolocationError={geolocationError}
      />
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
            placeholder="Find address or location"
            aria-label="Search for address or location"
          />
          <button type="submit" aria-label="Submit search">
            <span className="visually-hidden">Search</span>
            <SearchIcon className="icon-search" focusable="false" />
          </button>
        </div>
      </form>
      {isError ? <NotFound /> : null}
    </div>
  );
};

export default SearchBar;
