import styles from "./nav-button.module.css";

export const NavButton = ({
  img,
  alt,
  onClick,
  isActive,
}: {
  img: string;
  alt: string;
  onClick: () => void;
  isActive?: boolean;
}) => {
  return (
    <div
      className={`${styles.navButton} ${isActive ? styles.active : ""}`}
      onClick={onClick}
    >
      <img src={img} alt={alt} />
      <span>{alt}</span>
    </div>
  );
};
