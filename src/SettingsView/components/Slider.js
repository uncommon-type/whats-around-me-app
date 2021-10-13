import ReactSlider from 'react-slider';

const Slider = ({ apiTimeDelay, handleChange }) => (
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
        <ul className="slider-legend">
          <li className="legend__item">Driving: 0 seconds</li>
          <li className="legend__item">Cycling: 15 seconds</li>
          <li className="legend__item">Walking: 30 seconds</li>
        </ul>
      </div>
    </div>
  </aside>
);

export default Slider;
