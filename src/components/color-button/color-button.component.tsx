import type { CSSProperties } from "react";
import styles from "./color-button.module.css";

export const ColorButton = ({
  onClick,
  styleProps = {},
  text,
  disabled = false,
}: {
  onClick: (e?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  text: string;
  styleProps?: CSSProperties;
  disabled?: boolean;
}) => {
  return (
    <button
      style={{ ...styleProps }}
      onClick={onClick}
      className={styles.colorButton}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
