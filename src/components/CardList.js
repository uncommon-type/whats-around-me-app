import React, { useContext } from 'react';

import { FetchContext } from '../contexts/FetchContextProvider';

import Card from './Card';

const CardList = () => {
  const { data } = useContext(FetchContext);

  return (
    <>
      <h1 className="section__title">List</h1>
      <ul className="section__content list">
        {data?.query?.pages?.length > 0
          ? data.query.pages.map((location) => (
              <Card key={location.pageid} location={location} />
            ))
          : null}
      </ul>
    </>
  );
};

export default CardList;
