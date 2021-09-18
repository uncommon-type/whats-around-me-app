import React, { createContext, useState } from 'react';

export const GoogleContext = createContext();

const GoogleContextProvider = ({ children }) => {
  const [mapInstance, setMapInstance] = useState(null);
  const [mapApi, setMapApi] = useState(null);

  const handleApiLoaded = (map, maps) => {
    setMapInstance(map);
    setMapApi(maps);
  };

  const context = {
    handleApiLoaded,
    mapInstance,
    setMapInstance,
    mapApi,
    setMapApi,
  };

  return (
    <GoogleContext.Provider value={context}>{children}</GoogleContext.Provider>
  );
};

export default GoogleContextProvider;
