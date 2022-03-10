import { LocationMarkerIcon } from "@heroicons/react/solid";

import styles from "./usermarker.module.css";

const UserMarker = () => (
  <div className={styles["user-icon"]}>
    <LocationMarkerIcon className="user-location-icon" />
  </div>
);

export default UserMarker;
