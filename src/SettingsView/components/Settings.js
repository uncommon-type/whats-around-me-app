import React, { useContext } from 'react';

import Slider from './Slider';

import { FetchContext } from '../../contexts/FetchContextProvider';
import Instructions from './Instructions';

const Settings = ({ onViewChange, view }) => {
  const { apiTimeDelay, setApiTimeDelay } = useContext(FetchContext);

  const handleChange = (value) => {
    setApiTimeDelay(value);
  };

  return (
    <div className="content">
      <div className="content__inner splitter">
        <Slider apiTimeDelay={apiTimeDelay} handleChange={handleChange} />
        <Instructions onViewChange={onViewChange} view={view} />
      </div>
    </div>
  );
};

export default Settings;
