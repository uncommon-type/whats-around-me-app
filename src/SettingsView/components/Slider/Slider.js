import ReactSlider from 'react-slider';

import * as styles from './slider.module.css';

const Slider = ({ apiTimeDelay, onChange }) => (
  <aside className={styles['slider-group']}>
    <div className={styles['slider-group__inner']}>
      <div className={styles['slider-group__inner__wrapper']}>
        <h1>Adjust updates frequency</h1>
        <div className={styles['slider-container']}>
          <ReactSlider
            className={styles['slider']}
            thumbClassName={styles['thumb']}
            trackClassName={styles['track']}
            min={0}
            max={30}
            step={5}
            value={apiTimeDelay}
            onChange={onChange}
            renderThumb={(props, state) => (
              <div {...props}>{state.valueNow}</div>
            )}
          />
        </div>
        <ul className={styles['slider-legend']}>
          <li>Driving: 0 seconds</li>
          <li>Cycling: 15 seconds</li>
          <li>Walking: 30 seconds</li>
        </ul>
      </div>
    </div>
  </aside>
);

export default Slider;
