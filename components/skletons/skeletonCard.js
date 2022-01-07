import styles from "../../styles/skeleton.module.scss";
import SkeletonElement from "./skeletonElement";

/**
 * @author
 * @function SkeletonCard
 **/

const SkeletonCard = (props) => {
  return (
    <div className={styles.skeleton_card}>
      <SkeletonElement type="thumbnail"></SkeletonElement>
      <div className={styles.card_info_skeleton}>
        <SkeletonElement type="title"></SkeletonElement>
        <SkeletonElement type="artist"></SkeletonElement>
      </div>
    </div>
  );
};

export default SkeletonCard;
