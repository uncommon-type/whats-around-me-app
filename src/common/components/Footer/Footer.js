import { useContext } from "react";
import { useLocation } from "react-router-dom";

import { LocationContext } from "../../../contexts/LocationContextProvider";

import Nav from "../Nav/Nav";
import SearchBar from "../SearchBar/SearchBar";
import GeoLocationButton from "../GeoLocationButton/GeoLocationButton";

import styles from "./footer.module.css";

const Footer = () => {
  const { isWatchingLocation, handleSharing, handleStopSharing, geolocationError } = useContext(LocationContext);
  const { pathname } = useLocation();
  const showGeoLocationButtons = pathname !== "/settings";

  return (
    <footer className={`${styles["footer"]} gap-top`}>
      <div>
        {showGeoLocationButtons && (
          <>
            <GeoLocationButton
              handleSharing={handleSharing}
              isWatchingLocation={isWatchingLocation}
              handleStopSharing={handleStopSharing}
              geolocationError={geolocationError}
            />
            <SearchBar />
          </>
        )}
      </div>
      <Nav />
    </footer>
  );
};

export default Footer;
