import { createContext, useState } from 'react';

export const LocationContext = createContext();

const parisCoords = {
  lat: 48.8566,
  lng: 2.3522,
};

const LocationContextProvider = ({ children }) => {
  const [centerCoords, setCenterCoords] = useState({
    ...parisCoords,
    panning: false,
  });

  const [isWatchingLocation, setIsWatchingLocation] = useState(false);
  const [watcherId, setWatcherId] = useState(null);
  const [userPosition, setUserPosition] = useState({ lat: null, lng: null });
  const [geolocationError, setGeolocationError] = useState(null);

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
      ...parisCoords,
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
    centerCoords,
    setCenterCoords,
  };

  return (
    <LocationContext.Provider value={context}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContextProvider;
