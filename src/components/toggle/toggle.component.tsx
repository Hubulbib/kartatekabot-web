import styles from "./toggle.module.css";

export const Toggle = <T extends string>({
  active,
  setActive,
}: {
  active: string;
  setActive: React.Dispatch<React.SetStateAction<T>>;
}) => {
  return (
    <div className={styles.toggle} data-active={active}>
      <button
        className={active === "main" ? styles.toggleActive : ""}
        onClick={() => setActive("main" as T)}
      >
        Общий рейтинг
      </button>
      <button
        className={active === "personal" ? styles.toggleActive : ""}
        onClick={() => setActive("personal" as T)}
      >
        Личный рейтинг
      </button>
    </div>
  );
};
