import type { Cafe } from "../../entities/types";
import { Review } from "../review/review.component";
import styles from "./cafe-review.module.css";

export const CafeReview = ({ cafe }: { cafe: Cafe | null }) => {
  return (
    <div className={styles.sheetContentReview}>
      <h2>Отзывы</h2>
      <ul>
        {cafe?.reviews.map((el) => (
          <li key={el.id}>
            <Review key={el.id} review={el} />
          </li>
        ))}
      </ul>
    </div>
  );
};
