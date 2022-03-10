import { useContext } from "react";

import { FetchContext } from "../../contexts/FetchContextProvider";

import Card from "./Card";

import styles from "./cardlist.module.css";

const CardList = () => {
  const { data } = useContext(FetchContext);

  return (
    <div className="content">
      <div className={styles["grid"]}>
        {data?.query?.pages?.length > 0
          ? data.query.pages.map((location) => <Card key={location.pageid} location={location} />)
          : null}
      </div>
    </div>
  );
};

export default CardList;
