import { useContext } from 'react';

import { LocationContext } from '../../../contexts/LocationContextProvider';

import Footer from './Footer';
import SearchBar from '../SearchBar/SearchBar';
import GeoLocationButton from '../GeoLocationButton/GeoLocationButton';

const FooterWithSearchBar = () => {
  const {
    isWatchingLocation,
    handleSharing,
    handleStopSharing,
    geolocationError,
  } = useContext(LocationContext);

  return (
    <Footer>
      <div>
        <GeoLocationButton
          handleSharing={handleSharing}
          isWatchingLocation={isWatchingLocation}
          handleStopSharing={handleStopSharing}
          geolocationError={geolocationError}
        />
        <SearchBar />
      </div>
    </Footer>
  );
};

export default FooterWithSearchBar;
