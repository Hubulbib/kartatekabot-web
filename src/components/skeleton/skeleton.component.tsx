import type { CSSProperties } from "react";
import styles from "./skeleton.module.css";

export const Skeleton = ({ props }: { props?: CSSProperties }) => {
  return (
    <div className={styles.skeleton} style={{ ...props }}>
      <div />
      <div />
      <div />
    </div>
  );
};
