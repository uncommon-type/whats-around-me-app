import React from 'react';

const GeoLocationButton = ({
  handleSharing,
  isWatchingLocation,
  handleStopSharing,
  geolocationError,
}) => (
  <div className="location-controls gap-top-700">
    <button
      onClick={handleSharing}
      disabled={isWatchingLocation}
      className="share-btn"
    >
      Share Location
    </button>

    {geolocationError === null && isWatchingLocation ? (
      <button onClick={handleStopSharing} className="stop-btn">
        Stop Sharing Location
      </button>
    ) : null}
  </div>
);

export default GeoLocationButton;
