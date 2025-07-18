import { useContext, useState } from "react";
import styles from "./rating.module.css";
import { observer } from "mobx-react-lite";
import { Context } from "../../context/context";
import { Card, List, Section, Select } from "@telegram-apps/telegram-ui";
import { CardCell } from "@telegram-apps/telegram-ui/dist/components/Blocks/Card/components/CardCell/CardCell";
import { AppData } from "../../data";

export const RatingPage = observer(() => {
  const {} = useContext(Context);

  const cityKeys = Object.keys(AppData) as Array<keyof typeof AppData>;
  const [city, setCity] = useState<keyof typeof AppData>(cityKeys[0]);
  const coffeeList = AppData[city].places;

  return (
    <div className={styles.ratingPage}>
      <Section className={styles.coffeeSelect}>
        <Select
          header="Город"
          style={{
            backgroundColor: "var(--primary-color)",
          }}
          value={city}
          onChange={(e) => setCity(e.target.value as keyof typeof AppData)}
        >
          {Object.entries(AppData).map((el) => (
            <option key={el[0]} value={el[0]}>
              {el[1].city}
            </option>
          ))}
        </Select>
      </Section>
      <List className={styles.coffeeList}>
        {coffeeList.map((el, ind) => (
          <Card key={el.name + el.address} className={styles.coffeeCard}>
            <CardCell className={styles.coffeeCardText}>
              <div className={styles.coffeeName}>
                <span>№{ind + 1}</span> {el.name}
              </div>
              <div className={styles.coffeeRow}>
                <span className={styles.coffeeIcon}>⭐</span>
                <span className={styles.coffeeLabel}>Рейтинг:</span>
                <span className={styles.coffeeValue}>{el.rating}</span>
              </div>
              <div className={styles.coffeeRow}>
                <span className={styles.coffeeIcon}>💰</span>
                <span className={styles.coffeeLabel}>Ценовая категория:</span>
                <span className={styles.coffeeValue}>{el.price_category}</span>
              </div>
              <div className={styles.coffeeRow}>
                <span className={styles.coffeeIcon}>✨</span>
                <span className={styles.coffeeLabel}>Плюсы:</span>
                <span className={styles.coffeeValue}>
                  {el.pluses.join(", ")}
                </span>
              </div>
              <div className={styles.coffeeRow}>
                <span className={styles.coffeeIcon}>📍</span>
                <span className={styles.coffeeLabel}>Адрес:</span>
                <span className={styles.coffeeValue}>{el.address}</span>
              </div>
            </CardCell>
          </Card>
        ))}
      </List>
    </div>
  );
});
