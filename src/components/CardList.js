import React, { useContext } from 'react';

import { FetchContext } from '../contexts/FetchContextProvider';

import Card from './Card';
import Header from './Header';
import SearchBar from './SearchBar';
import GeoLocationButton from './GeoLocationButton';

const CardList = () => {
  const {
    data,
    handleSharing,
    isWatchingLocation,
    handleStopSharing,
    geolocationError,
  } = useContext(FetchContext);

  return (
    <>
      <Header>
        <SearchBar />
      </Header>

      <main>
        <GeoLocationButton
          handleSharing={handleSharing}
          isWatchingLocation={isWatchingLocation}
          handleStopSharing={handleStopSharing}
          geolocationError={geolocationError}
        />
        <section className="app-content gap-top-700">
          <ul className="list items">
            {data?.query?.pages?.length > 0
              ? data.query.pages.map((location) => (
                  <Card key={location.pageid} location={location} />
                ))
              : null}
          </ul>
        </section>
      </main>
    </>
  );
};

export default CardList;
