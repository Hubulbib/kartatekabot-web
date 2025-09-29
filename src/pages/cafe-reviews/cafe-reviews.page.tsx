import { observer } from "mobx-react-lite";
import styles from "./cafe-reviews.module.css";
import { useContext, useEffect } from "react";
import { Context } from "../../context";
import { useParams } from "react-router-dom";
import { Review } from "../../components/review/review.component";

export const CafeReviewsPage = observer(() => {
  const { id } = useParams();

  const {
    cafeStore: { cafe, getCafe },
  } = useContext(Context);

  useEffect(() => {
    if (id && !isNaN(+id)) getCafe(+id);
  }, [id]);

  return (
    <div className={styles.cafeReviewsPage}>
      <h2>Все отзывы</h2>
      <ul>
        {cafe?.reviews.map((el) => (
          <li key={el.id}>
            <Review key={el.id} review={el} />
          </li>
        ))}
      </ul>
    </div>
  );
});
