import { formatDate } from "../../utils/helpers";
import styles from "./promotion.module.css";

export const Promotion = ({
  image,
  text,
  dateStart,
  dateEnd,
  onClick,
}: {
  image?: string;
  text: string;
  dateStart: Date;
  dateEnd: Date;
  onClick: () => void;
}) => {
  return (
    <div
      style={image ? { backgroundImage: `url(${image})` } : {}}
      className={`${styles.promotion} ${image ? styles.img : ""}`}
      onClick={onClick}
    >
      <h3>{text}</h3>
      <div className={styles.dates}>
        <h6>Начало: {formatDate(dateStart)}</h6>
        <h6>Окончание: {formatDate(dateEnd)}</h6>
      </div>
    </div>
  );
};
