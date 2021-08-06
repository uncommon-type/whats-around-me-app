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
  const [userPosition, setUserPosition] = useState({ lat: null, lng: null });
  const [watcherId, setWatcherId] = useState(null);
  const [isWatchingLocation, setIsWatchingLocation] = useState(false);
  //I had to introduce a new piece of state to track current mapCenter
  // Without it, on the initial page load, the map default view is blank
  const [currentMapCenter, setCurrentMapCenter] = useState({
    lat: 48.8566,
    lng: 2.3522,
  });
  const { data, centerCoords, setCenterCoords } = useContext(FetchContext);
  const debouncedUserPosition = useDebounce(userPosition, 1000);

  useEffect(() => {
    if (debouncedUserPosition) {
      setCenterCoords(debouncedUserPosition);
    }
  }, [debouncedUserPosition, setCenterCoords]);

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
    setCurrentMapCenter({ lat: latitude, lng: longitude });
  };

  const onError = (error) => {
    //TODO:Handle permission-denied/position-unavailale
    console.log(error);
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

        {isWatchingLocation ? (
          <button onClick={handleStopSharing} className="stop-btn">
            Stop Sharing Location
          </button>
        ) : null}
      </header>
      <div className="section__content">
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyCbfV0IAdkkGv-9mmuAkUJNzCPPfGRO6v0',
            }}
            center={currentMapCenter}
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
                        location?.thumbnail?.source ||
                        `${process.env.PUBLIC_URL}/placeholder.png`
                      }
                      alt={location?.thumbnail?.source ? location.title : ''}
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
