import ReactSlider from 'react-slider';

import SliderLegend from './SliderLegend';

const Slider = ({ apiTimeDelay, handleChange }) => {
  return (
    <aside className="slider-group">
      <div className="slider-group__inner">
        <div className="slider-group__inner__wrapper">
          <h4>Adjust updates frequency</h4>
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
          <SliderLegend />
        </div>
      </div>
    </aside>
  );
};

export default Slider;
