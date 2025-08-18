import styles from "./select.module.css";

export const Select = <T extends string>({
  city,
  setCity,
  items,
  isAll = true,
}: {
  city: string;
  setCity: React.Dispatch<React.SetStateAction<T>>;
  items: { key: T; value: string }[];
  isAll: boolean;
}) => {
  return (
    <div className={styles.selectWrapper}>
      <select
        value={city}
        onChange={(e) => setCity(e.target.value as T)}
        className={styles.selectValue}
      >
        {isAll
          ? [
              <option key={"All"}>Все</option>,
              ...items.map((el) => (
                <option value={el.key} key={el.key}>
                  {el.value}
                </option>
              )),
            ]
          : [
              ...items.map((el) => (
                <option value={el.key} key={el.key}>
                  {el.value}
                </option>
              )),
            ]}
      </select>
      <span className={styles.selectArrow}>▼</span>
    </div>
  );
};
