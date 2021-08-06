import React from 'react';

import GoogleMapReact from 'google-map-react';

const Map = () => {
  const defaultProps = {
    center: {
      lat: 48.8566,
      lng: 2.3522,
    },
    zoom: 16,
  };

  return (
    <>
      <h1>Lorem Ipsum</h1>
      <div className="section__content">
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyCbfV0IAdkkGv-9mmuAkUJNzCPPfGRO6v0',
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          />
        </div>
      </div>
    </>
  );
};

export default Map;
