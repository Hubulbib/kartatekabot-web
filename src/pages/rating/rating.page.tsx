import { useContext, useState } from "react";
import styles from "./rating.module.css";
import { observer } from "mobx-react-lite";
import { Context } from "../../context/context";
import { AppData } from "../../data";
import { Select } from "../../components/select/select.component";
import { Card } from "../../components/card/card.component";

export const RatingPage = observer(() => {
  const {} = useContext(Context);

  const cityKeys = Object.keys(AppData) as Array<keyof typeof AppData>;
  const [city, setCity] = useState<keyof typeof AppData>(cityKeys[0]);
  const coffeeList = AppData[city].places;

  return (
    <div className={styles.ratingPage}>
      <section className={styles.coffeeSelect}>
        <h2>Город</h2>
        <Select
          city={city}
          setCity={setCity}
          items={Object.entries(AppData).map((el) => ({
            key: el[0] as keyof typeof AppData,
            value: el[1].city,
          }))}
          isAll={false}
        />
      </section>
      <ul className={styles.coffeeList}>
        {coffeeList
          .sort((a, b) => b.rating - a.rating)
          .map((el, ind) => (
            <Card key={ind} data={el} ind={ind} />
          ))}
      </ul>
    </div>
  );
});
