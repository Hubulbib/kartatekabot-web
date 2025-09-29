import { observer } from "mobx-react-lite";
import styles from "./profile-reviews.module.css";
import { useContext, useEffect } from "react";
import { Context } from "../../context";
import { Skeleton } from "../../components/skeleton/skeleton.component";
import { ProfleReview } from "../../components/profile-review/profile-review.component";

export const ProfileReviewsPage = observer(() => {
  const {
    userStore: { isUserLoading, getUserReviews, userReviews },
  } = useContext(Context);

  useEffect(() => {
    getUserReviews();
  }, []);

  if (isUserLoading) {
    return (
      <div className={styles.userReviewsPage}>
        <Skeleton />
      </div>
    );
  } else if (userReviews.length === 0) {
    <div className={styles.userReviewsPage}>
      <h2>Вы пока не оставляли отзывов 🥱</h2>
    </div>;
  }

  return (
    <div className={styles.userReviewsPage}>
      <h2>Последние отзывы</h2>
      <ul>
        {userReviews.map((el) => (
          <li key={el.id}>
            <ProfleReview key={el.id} review={el} />
          </li>
        ))}
      </ul>
    </div>
  );
});
