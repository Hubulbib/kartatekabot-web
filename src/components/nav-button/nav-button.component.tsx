import styles from "./nav-button.module.css";

export const NavButton = ({
  img,
  alt,
  onClick,
}: {
  img: string;
  alt: string;
  onClick: () => void;
}) => {
  return (
    <div className={styles.navButton} onClick={onClick}>
      <img src={img} alt={alt} />
    </div>
  );
};
