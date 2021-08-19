import React, { createContext, useContext, useState } from 'react';
import { FetchContext } from './FetchContextProvider';

export const ShareLocationContext = createContext();

const ShareLocationContextProvider = ({ children }) => {
  const [isWatchingLocation, setIsWatchingLocation] = useState(false);
  const [watcherId, setWatcherId] = useState(null);
  const [userPosition, setUserPosition] = useState({ lat: null, lng: null });
  const [geolocationError, setGeolocationError] = useState(null);
  const { setCenterCoords } = useContext(FetchContext);

  const onSuccess = ({ coords }) => {
    const { latitude, longitude } = coords;
    setUserPosition({ lat: latitude, lng: longitude });
    setCenterCoords({
      lat: latitude,
      lng: longitude,
      panning: false,
    });
    setIsWatchingLocation(true);
    setGeolocationError(null);
  };

  const onError = (error) => {
    setGeolocationError(error.code);
    setIsWatchingLocation(false);
  };

  const handleSharing = () => {
    const watcherId = navigator.geolocation.watchPosition(onSuccess, onError, {
      enableHighAccuracy: true,
    });

    setWatcherId(watcherId);
  };

  const handleStopSharing = () => {
    if (isWatchingLocation && watcherId) {
      navigator.geolocation.clearWatch(watcherId);
    }

    setIsWatchingLocation(false);
    setCenterCoords({
      lat: 48.8566,
      lng: 2.3522,
      panning: true,
    });
  };

  const context = {
    isWatchingLocation,
    setIsWatchingLocation,
    watcherId,
    setWatcherId,
    userPosition,
    setUserPosition,
    handleSharing,
    handleStopSharing,
    geolocationError,
  };

  return (
    <ShareLocationContext.Provider value={context}>
      {children}
    </ShareLocationContext.Provider>
  );
};

export default ShareLocationContextProvider;
