import styles from "./app.module.css";

function Root() {
  return (
    <div className={`${styles["app"]} ${styles["gap-top"]}`}>
      <h1>Hello world!</h1>
    </div>
  );
}

export default Root;

// function Root() {
//   return (
//     <div className={`${styles.app} ${styles.bkdcolor}`}>
//       <h1>Hello world!</h1>
//     </div>
//   );
// }

// export default Root;
