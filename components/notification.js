import styles from "../styles/horizentalLayout.module.scss";
import Local from "../icones/local.svg";
/**
 * @author
 * @function Notificaiton
 **/

const Notification = (props) => {
  return (
    <div className={styles.notification_container}>
      <div className={styles.notification}>
        <div className={styles.icon_container}>
          <Local></Local>
        </div>
        <div className={styles.notif_info}>
          <h3>Playlist added</h3>
          <h4>106 songs</h4>
        </div>
        <div className={styles.notif_time}>
          <h4>2 Mins</h4>
        </div>
      </div>
    </div>
  );
};

export default Notification;
