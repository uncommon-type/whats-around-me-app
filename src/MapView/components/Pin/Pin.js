import * as styles from './pin.module.css';

const Pin = ({ imageUrl, alt, onClick }) => (
  <div
    className={`${styles['map-icon']} fade`}
    onClick={onClick}
    aria-hidden={true}
  >
    <img src={imageUrl} alt={alt} />
  </div>
);

export default Pin;
