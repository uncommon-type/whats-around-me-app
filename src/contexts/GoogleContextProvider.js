import React, { createContext, useState, useEffect } from 'react';

import { Loader } from '@googlemaps/js-api-loader';

export const GoogleContext = createContext();

const GoogleContextProvider = ({ children }) => {
  const [mapInstance, setMapInstance] = useState(null);
  const [mapApi, setMapApi] = useState(null);

  useEffect(() => {
    const loadApi = async () => {
      const loader = new Loader({
        apiKey: 'AIzaSyDReDgyRM1t9H2HncIec_v_zh2DeJGggT0',
        id: '__googleMapsScriptId',
        libraries: ['places'],
        version: 'weekly',
      });

      const google = await loader.load();
      setMapApi(google.maps);
      setMapInstance(new google.maps.Map(document.createElement('div')));
    };

    loadApi();
  }, [setMapApi]);

  const context = {
    mapInstance,
    mapApi,
    ready: mapApi !== null,
  };

  return (
    <GoogleContext.Provider value={context}>{children}</GoogleContext.Provider>
  );
};

export default GoogleContextProvider;
