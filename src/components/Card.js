import React from 'react';

const Card = ({ location }) => {
  const { coordinates, pageid: id, title, description } = location;

  return (
    <li className="list__item" key={id}>
      <div className="image">
        <img
          src={
            location.thumbnail?.source ||
            `${process.env.PUBLIC_URL}/placeholder.png`
          }
          alt={location.thumbnail?.source ? location.title : ''}
        />
      </div>
      <div className="text">
        <h2 className="item__title">{title}</h2>
        <p className="item__description">{description}</p>
        <p className="item__description">Distance: {coordinates[0].dist} km</p>
        <a
          className="dialog__body__link"
          href={`https://en.wikipedia.org/?curid=${id}`}
          aria-label={`Read more about ${title}`}
        >
          Learn More
        </a>
      </div>
    </li>
  );
};

export default Card;
