import styles from "./image-label-button.module.css";

export const ImageLabelButton = ({
  img,
  text,
  onClick,
}: {
  img: string;
  text: string;
  onClick: () => void;
}) => {
  return (
    <div className={styles.imageLabelButton} onClick={onClick}>
      <img src={img} alt={text} />
      <span>{text}</span>
    </div>
  );
};
