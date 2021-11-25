import { XCircleIcon } from '@heroicons/react/solid';

import { Dialog as ReachDialog } from '@reach/dialog';
import '@reach/dialog/styles.css';

import * as styles from './dialog.module.css';

const Dialog = ({ locationDetails, onClick, onDismiss, ariaLabel }) => (
  <ReachDialog onDismiss={onDismiss} aria-label={ariaLabel}>
    <button
      className={styles['dialog__button']}
      aria-label="close dialog"
      onClick={onClick}
    >
      <XCircleIcon />
    </button>

    <div className={styles['dialog__image']}>
      <img
        src={
          locationDetails?.thumbnail?.source ||
          `${process.env.PUBLIC_URL}/placeholder.png`
        }
        alt={locationDetails?.thumbnail?.source ? locationDetails.title : ''}
      />
    </div>
    <div className={styles['dialog__body']}>
      <h2>{locationDetails.title}</h2>
      <p>{locationDetails.description}</p>
      <a
        className={styles['dialog__body__link']}
        href={`https://en.wikipedia.org/?curid=${locationDetails.pageid}`}
        aria-label={`Read more about ${locationDetails.title}`}
      >
        Learn More
      </a>
    </div>
  </ReachDialog>
);

export default Dialog;
