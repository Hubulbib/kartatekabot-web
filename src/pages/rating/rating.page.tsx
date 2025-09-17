import { useContext, useEffect, useState } from "react";
import styles from "./rating.module.css";
import { observer } from "mobx-react-lite";
import { Context } from "../../context/context";
import { Card } from "../../components/card/card.component";
import { Toggle } from "../../components/toggle/toggle.component";
import { Skeleton } from "../../components/skeleton/skeleton.component";

export const RatingPage = observer(() => {
  const {
    ratingStore: {
      getPersonalRating,
      personalRating,
      getRating,
      rating,
      isRatingLoading,
    },
    userStore: { user, getUser },
  } = useContext(Context);

  const [toggle, setToggle] = useState<"main" | "personal">("main");

  useEffect(() => {
    if (user?.city) {
      getRating(user?.city?.name);
      getPersonalRating(user?.city?.name);
    }
  }, [user]);

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className={styles.ratingPage}>
      <section className={styles.ratingToggle}>
        <Toggle active={toggle} setActive={setToggle} />
      </section>
      {isRatingLoading ? (
        <Skeleton />
      ) : (toggle === "main" && rating.length === 0) ||
        (toggle === "personal" && personalRating.length === 0) ? (
        <span className={styles.ratingNone}>Пока рейтинг пуст 🥱</span>
      ) : (
        <ul className={styles.coffeeList}>
          {toggle === "main"
            ? rating.map((el, ind) => <Card key={el.id} data={el} ind={ind} />)
            : personalRating.map((el, ind) => (
                <Card key={el.id} data={el} ind={ind} />
              ))}
        </ul>
      )}
    </div>
  );
});
