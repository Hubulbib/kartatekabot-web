import type { CSSProperties } from "react";
import styles from "./color-button.module.css";

export const ColorButton = ({
  onClick,
  styleProps = {},
  text,
}: {
  onClick: () => void;
  text: string;
  styleProps?: CSSProperties;
}) => {
  return (
    <button
      style={{ ...styleProps }}
      onClick={onClick}
      className={styles.colorButton}
    >
      {text}
    </button>
  );
};
