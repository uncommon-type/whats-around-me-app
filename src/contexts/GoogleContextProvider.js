import React, { createContext, useState } from 'react';

export const GoogleContext = createContext();

const GoogleContextProvider = ({ children }) => {
  const [mapInstance, setMapInstance] = useState(null);
  const [mapApi, setMapApi] = useState(null);
  const [mapApiLoaded, setMapApiLoaded] = useState(false);

  const handleApiLoaded = (map, maps) => {
    setMapApiLoaded(true);
    setMapInstance(map);
    setMapApi(maps);
  };

  const context = {
    mapApiLoaded,
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
