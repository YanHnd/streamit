import styles from "../styles/card.module.scss";

/**
 * @author
 * @function ArtistCard
 **/

const ArtistCard = ({ url, alt, name }) => {
  return (
    <div className={styles.artist_card}>
      <div className={styles.image_container}>
        <img src={url} alt={alt} />
      </div>
      <h4>{name}</h4>
    </div>
  );
};

export default ArtistCard;
