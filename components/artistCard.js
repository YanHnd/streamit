import styles from "../styles/card.module.scss";
import { useRouter } from "next/router";
/**
 * @author
 * @function Card
 **/

export const ArtistCArd = (props) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/artist/${props.id}`);
  };
  return (
    <div onClick={() => handleClick()} className={styles.card}>
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
