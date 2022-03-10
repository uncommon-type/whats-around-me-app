import React, { createContext, useContext, useState } from 'react';

import { LocationContext } from './LocationContextProvider';
import useFetch from '../hooks/useFetch';

import ErrorMessage from '../common/components/ErrorMessage/ErrorMessage';

export const FetchContext = createContext();

const FetchContextProvider = ({ children }) => {
  const [apiTimeDelay, setApiTimeDelay] = useState(0);
  const { centerCoords } = useContext(LocationContext);
  const { status, data, error } = useFetch(centerCoords, apiTimeDelay * 1000);

  const isError = status === 'error';

  if (isError) {
    return <ErrorMessage error={error} />;
  }

  const context = {
    data,
    apiTimeDelay,
    setApiTimeDelay,
  };

  return data ? (
    <FetchContext.Provider value={context}>{children}</FetchContext.Provider>
  ) : null;
};

export default FetchContextProvider;
