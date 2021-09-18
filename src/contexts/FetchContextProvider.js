import React, { createContext, useState } from 'react';

import useFetch from '../hooks/useFetch';
import ErrorMessage from '../common/components/ErrorMessage';

export const FetchContext = createContext();

const FetchContextProvider = ({ children }) => {
  const [centerCoords, setCenterCoords] = useState({
    lat: 48.8566,
    lng: 2.3522,
    panning: false,
  });

  const [apiTimeDelay, setApiTimeDelay] = useState(0);
  const { status, data, error } = useFetch(centerCoords, apiTimeDelay * 1000);

  const isError = status === 'error';

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  const context = {
    data,
    setCenterCoords,
    centerCoords,
    apiTimeDelay,
    setApiTimeDelay,
  };

  return data ? (
    <FetchContext.Provider value={context}>{children}</FetchContext.Provider>
  ) : null;
};

export default FetchContextProvider;
