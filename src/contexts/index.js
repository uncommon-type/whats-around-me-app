import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import LocationContextProvider from './LocationContextProvider';
import FetchContextProvider from './FetchContextProvider';
import GoogleContextProvider from './GoogleContextProvider';

const AppProviders = ({ children }) => {
  return (
    <LocationContextProvider>
      <Router>
        <FetchContextProvider>
          <GoogleContextProvider>{children}</GoogleContextProvider>
        </FetchContextProvider>
      </Router>
    </LocationContextProvider>
  );
};

export { AppProviders };
