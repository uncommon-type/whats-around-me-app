import React, { useContext } from 'react';

import ReactSlider from 'react-slider';

import { FetchContext } from '../contexts/FetchContextProvider';

import Header from './Header';

const Settings = ({ onViewChange }) => {
  const { apiTimeDelay, setApiTimeDelay } = useContext(FetchContext);

  const handleChange = (value) => {
    setApiTimeDelay(value);
  };

  return (
    <>
      <Header title="Settings" />
      <main>
        <section className="app-content">
          <div className="settings">
            <p className="settings__title">
              Adjust how often the app refreshes with new locations
            </p>
            <div className="slider-container">
              <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                min={0}
                max={30}
                step={5}
                value={apiTimeDelay}
                onChange={handleChange}
                renderThumb={(props, state) => (
                  <div {...props}>{state.valueNow}</div>
                )}
              />
            </div>
            <ul>
              <li className="settings__options">Car/Train: 0 seconds</li>
              <li className="settings__options">Bicycle: 15 seconds</li>
              <li className="settings__options">Walking: 30 seconds</li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
};

export default Settings;
