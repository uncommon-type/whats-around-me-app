import React, { useState, useContext } from 'react';

import GoogleMapReact from 'google-map-react';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

import { FetchContext } from '../../contexts/FetchContextProvider';

import Pin from './Pin';
import DialogBody from '../Dialog/DialogBody';

const Map = () => {
  const [loaded, setLoaded] = useState(false);
  const [locationDetails, setLocationDetails] = useState(null);
  const { data, centerCoords, setCenterCoords } = useContext(FetchContext);

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

  return (
    <>
      <h1>Lorem Ipsum</h1>
      <div className="section__content">
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyCbfV0IAdkkGv-9mmuAkUJNzCPPfGRO6v0',
            }}
            center={centerCoords}
            defaultZoom={zoom}
            onGoogleApiLoaded={handleApiLoaded}
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
