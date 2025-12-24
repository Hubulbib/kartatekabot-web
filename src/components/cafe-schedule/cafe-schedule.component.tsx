import styles from "./cafe-schedule.module.css";

const WEEKDAY_NAMES = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];

export const CafeSchedule = ({
  schedule,
  note,
}: {
  schedule: string[];
  note?: string;
}) => {
  return (
    <div className={styles.cafeSchedule}>
      <h2>Расписание</h2>
      {note ? <p>{note}</p> : null}
      <ul className={styles.schedule}>
        {WEEKDAY_NAMES.map((el, ind) => (
          <li key={el}>
            <span>{el}</span>
            <span>{schedule[ind] ? schedule[ind] : "Нет данных"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
