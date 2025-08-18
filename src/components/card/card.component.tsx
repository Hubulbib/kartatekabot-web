import type { AppData } from "../../data";
import styles from "./card.module.css";

interface CardProps<T> {
  data: T;
  ind: number;
}

export const Card = <
  T extends (typeof AppData)[keyof typeof AppData]["places"][0]
>({
  data,
  ind,
}: CardProps<T>) => {
  return (
    <div key={data.name + data.address} className={styles.coffeeCard}>
      <div className={styles.coffeeCardText}>
        <div className={styles.coffeeName}>
          <span>№{ind + 1}</span> {data.name}
        </div>
        <div className={styles.coffeeRow}>
          <span className={styles.coffeeIcon}>⭐</span>
          <span className={styles.coffeeLabel}>Рейтинг:</span>
          <span className={styles.coffeeValue}>{data.rating}</span>
        </div>
        <div className={styles.coffeeRow}>
          <span className={styles.coffeeIcon}>📍</span>
          <span className={styles.coffeeLabel}>Адрес:</span>
          <span className={styles.coffeeValue}>{data.address}</span>
        </div>
      </div>
    </div>
  );
};
