import React, { useState, useContext, useCallback, useEffect } from 'react';

import GoogleMapReact from 'google-map-react';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

import { FetchContext } from '../../contexts/FetchContextProvider';
import useDebounce from '../../hooks/useDebounce';

import Pin from './Pin';
import DialogBody from '../Dialog/DialogBody';
import UserMarker from './UserMarker';

const Map = () => {
  const [loaded, setLoaded] = useState(false);
  const [locationDetails, setLocationDetails] = useState(null);
  const [geolocationError, setGeolocationError] = useState(null);
  const {
    data,
    centerCoords,
    setCenterCoords,
    isWatchingLocation,
    setIsWatchingLocation,
    watcherId,
    setWatcherId,
    userPosition,
    setUserPosition,
  } = useContext(FetchContext);

  const debouncedUserPosition = useDebounce(userPosition, 1000);

  useEffect(() => {
    if (debouncedUserPosition) {
      setCenterCoords(debouncedUserPosition);
    }
    setCenterCoords(centerCoords);
  }, [debouncedUserPosition, setCenterCoords, centerCoords]);

  const { zoom } = data;

  const handleApiLoaded = () => {
    setLoaded(true);
  };

  const handlePinClick = (location) => {
    setLocationDetails(location);
  };

  const closeDialog = () => {
    setLocationDetails(null);
  };

  const handleDrag = useCallback(
    (map) => {
      setCenterCoords({ lat: map.center.lat(), lng: map.center.lng() });
    },
    [setCenterCoords],
  );

  const onSuccess = ({ coords }) => {
    const { latitude, longitude } = coords;
    setUserPosition({ lat: latitude, lng: longitude });
    setCenterCoords({ lat: latitude, lng: longitude });
  };

  const onError = (error) => {
    //TODO:Handle permission-denied/position-unavailale
    console.log(error);
    setGeolocationError(error.code);
    setIsWatchingLocation(false);
  };

  const handleSharing = () => {
    const watcherId = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });

    setWatcherId(watcherId);
    setIsWatchingLocation(true);
  };

  const handleStopSharing = () => {
    if (isWatchingLocation && watcherId) {
      navigator.geolocation.clearWatch(watcherId);
    }

    setIsWatchingLocation(false);
    setCenterCoords({ lat: 48.8566, lng: 2.3522 });
  };

  return (
    <>
      <header>
        <h1>Lorem Ipsum</h1>
        <button
          onClick={handleSharing}
          disabled={isWatchingLocation}
          className="share-btn"
        >
          Share Location
        </button>

        {geolocationError === null && isWatchingLocation && (
          <button onClick={handleStopSharing} className="stop-btn">
            Stop Sharing Location
          </button>
        )}
      </header>
      <div className="section__content">
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyCbfV0IAdkkGv-9mmuAkUJNzCPPfGRO6v0',
            }}
            center={centerCoords}
            defaultZoom={zoom}
            yesIWantToUseGoogleMapApiInternals={true}
            onGoogleApiLoaded={handleApiLoaded}
            onDragEnd={(map) => handleDrag(map)}
          >
            {data?.query?.pages?.length > 0 && loaded
              ? data.query.pages.map((location) => {
                  const { coordinates, pageid: id } = location;
                  return (
                    <Pin
                      key={id}
                      lat={coordinates[0].lat}
                      lng={coordinates[0].lon}
                      imageUrl={
                        location.thumbnail?.source ||
                        `${process.env.PUBLIC_URL}/placeholder.png`
                      }
                      alt={location.thumbnail?.source ? location.title : ''}
                      onClick={() => {
                        handlePinClick(location);
                      }}
                    />
                  );
                })
              : null}

            {userPosition ? (
              <UserMarker lat={userPosition.lat} lng={userPosition.lng} />
            ) : null}
          </GoogleMapReact>
          {locationDetails ? (
            <Dialog
              className="dialog"
              onDismiss={closeDialog}
              aria-label="Location details"
            >
              <DialogBody
                onClick={closeDialog}
                locationDetails={locationDetails}
              />
            </Dialog>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default Map;
