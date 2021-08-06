import React, { createContext, useState } from 'react';

import useFetch from '../hooks/useFetch';
import ErrorMessage from '../components/ErrorMessage';

export const FetchContext = createContext();

const FetchContextProvider = ({ children }) => {
  const [centerCoords, setCenterCoords] = useState({
    lat: 48.8566,
    lng: 2.3522,
  });
  const [isWatchingLocation, setIsWatchingLocation] = useState(false);
  const [watcherId, setWatcherId] = useState(null);
  const [userPosition, setUserPosition] = useState({ lat: null, lng: null });
  const { lat, lng } = centerCoords;
  const { status, data, error } = useFetch(lat, lng);
  const isError = status === 'error';

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  return data ? (
    <FetchContext.Provider
      value={{
        data,
        setCenterCoords,
        centerCoords,
        isWatchingLocation,
        setIsWatchingLocation,
        watcherId,
        setWatcherId,
        userPosition,
        setUserPosition,
      }}
    >
      {children}
    </FetchContext.Provider>
  ) : null;
};

export default FetchContextProvider;
