import { useContext } from 'react';

import { FetchContext } from '../../../contexts/FetchContextProvider';

import Slider from '../Slider/Slider';
import Instructions from '../Instructions/Instructions';

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
