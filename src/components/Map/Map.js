import React, { useState, useContext, useCallback } from 'react';

import GoogleMapReact from 'google-map-react';
import { Dialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

import { FetchContext } from '../../contexts/FetchContextProvider';
import { GoogleContext } from '../../contexts/GoogleContextProvider';
import { ShareLocationContext } from '../../contexts/ShareLocationContextProvider';

import GeoLocationButton from '../GeoLocationButton';
import Pin from './Pin';
import UserMarker from './UserMarker';
import DialogBody from '../Dialog/DialogBody';
import mapStyle from './mapStyle.json';

const Map = () => {
  const [locationDetails, setLocationDetails] = useState(null);
  const { data, centerCoords, setCenterCoords } = useContext(FetchContext);
  const {
    isWatchingLocation,
    userPosition,
    handleSharing,
    handleStopSharing,
    geolocationError,
  } = useContext(ShareLocationContext);

  const { handleApiLoaded } = useContext(GoogleContext);
  const { zoom } = data;

  const handlePinClick = (location) => {
    setLocationDetails(location);
  };

  const handleCloseDialog = () => {
    setLocationDetails(null);
  };

  const handleMapDrag = useCallback(
    (map) => {
      setCenterCoords({
        lat: map.center.lat(),
        lng: map.center.lng(),
        panning: true,
      });
    },
    [setCenterCoords],
  );

  return (
    <main>
      <GeoLocationButton
        handleSharing={handleSharing}
        isWatchingLocation={isWatchingLocation}
        handleStopSharing={handleStopSharing}
        geolocationError={geolocationError}
      />

      <div className="app-content gap-top-700 ">
        <div className="map">
          <GoogleMapReact
            bootstrapURLKeys={{
              key: 'AIzaSyDReDgyRM1t9H2HncIec_v_zh2DeJGggT0',
              libraries: ['places'],
              id: '__googleMapsScriptId',
              version: 'weekly',
            }}
            center={centerCoords}
            defaultZoom={zoom}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
            onDragEnd={(map) => handleMapDrag(map)}
            options={mapStyle}
          >
            {data?.query?.pages?.length > 0
              ? data.query.pages.map((location) => {
                  const { coordinates, pageid: id } = location;
                  return (
                    <Pin
                      key={id}
                      lat={coordinates[0].lat}
                      lng={coordinates[0].lon}
                      imageUrl={
                        location.thumbnail?.source ||
                        `${process.env.PUBLIC_URL}/placeholder.png`
                      }
                      alt={location.thumbnail?.source ? location.title : ''}
                      onClick={() => {
                        handlePinClick(location);
                      }}
                    />
                  );
                })
              : null}
            {userPosition ? (
              <UserMarker lat={userPosition.lat} lng={userPosition.lng} />
            ) : null}
          </GoogleMapReact>

          {locationDetails ? (
            <Dialog
              className="dialog"
              onDismiss={handleCloseDialog}
              aria-label="Location details"
            >
              <DialogBody
                onClick={handleCloseDialog}
                locationDetails={locationDetails}
              />
            </Dialog>
          ) : null}
        </div>
      </div>
    </main>
  );
};

export default Map;
