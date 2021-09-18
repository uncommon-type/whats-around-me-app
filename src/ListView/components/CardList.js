import React, { useContext } from 'react';

import { FetchContext } from '../../contexts/FetchContextProvider';

import Card from './Card';

const CardList = () => {
  const { data } = useContext(FetchContext);

  return (
    <div className="content">
      <div className="grid">
        {data?.query?.pages?.length > 0
          ? data.query.pages.map((location) => (
              <Card key={location.pageid} location={location} />
            ))
          : null}
      </div>
    </div>
  );
};

export default CardList;
