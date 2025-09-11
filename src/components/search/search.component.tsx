import styles from "./search.module.css";

export const Search = ({
  value,
  setValue,
  placeholder,
}: {
  value: string;
  setValue: (str: string) => void;
  placeholder: string;
}) => {
  return (
    <input
      className={styles.search}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
    />
  );
};
