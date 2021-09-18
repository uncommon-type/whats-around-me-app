import React from 'react';

import { XCircleIcon } from '@heroicons/react/solid';

const DialogBody = ({ locationDetails, onClick }) => (
  <>
    <button
      className="dialog__button"
      aria-label="close dialog"
      onClick={onClick}
    >
      <XCircleIcon />
    </button>

    <div className="dialog__image">
      <img
        src={
          locationDetails?.thumbnail?.source ||
          `${process.env.PUBLIC_URL}/placeholder.png`
        }
        alt={locationDetails?.thumbnail?.source ? locationDetails.title : ''}
      />
    </div>
    <div className="dialog__body">
      <h2>{locationDetails.title}</h2>
      <p>{locationDetails.description}</p>
      <a
        className="dialog__body__link"
        href={`https://en.wikipedia.org/?curid=${locationDetails.pageid}`}
        aria-label={`Read more about ${locationDetails.title}`}
      >
        Learn More
      </a>
    </div>
  </>
);

export default DialogBody;
