import styles from "./geolocationbutton.module.css";

const GeoLocationButton = ({ handleSharing, isWatchingLocation, handleStopSharing, geolocationError }) => (
  <div className="location-controls">
    <button onClick={handleSharing} disabled={isWatchingLocation} className={styles["share-btn"]}>
      Find My Location
    </button>

    {geolocationError === null && isWatchingLocation ? (
      <button onClick={handleStopSharing} className={styles["stop-btn"]}>
        Stop Sharing Location
      </button>
    ) : null}
  </div>
);

export default GeoLocationButton;
