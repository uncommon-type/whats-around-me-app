import React, { useContext } from 'react';

import { FetchContext } from '../../contexts/FetchContextProvider';
import { ShareLocationContext } from '../../contexts/ShareLocationContextProvider';

import Card from './Card';
import GeoLocationButton from '../GeoLocationButton';

const CardList = () => {
  const { data } = useContext(FetchContext);

  const {
    isWatchingLocation,
    handleSharing,
    handleStopSharing,
    geolocationError,
  } = useContext(ShareLocationContext);

  return (
    <>
      <main>
        <GeoLocationButton
          handleSharing={handleSharing}
          isWatchingLocation={isWatchingLocation}
          handleStopSharing={handleStopSharing}
          geolocationError={geolocationError}
        />
        <section className="app-content">
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
