import styles from "../styles/card.module.scss";

/**
 * @author
 * @function Card
 **/

export const ArtistCArd = (props) => {
  return (
    <div className={styles.card}>
      <div className={styles.image_container}>
        <img src={props.url} />
      </div>
      <div className={styles.info_container}>
        <h3>{props.name}</h3>
      </div>
      <div className={styles.background}></div>
    </div>
  );
};
