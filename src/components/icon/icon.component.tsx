import styles from "./icon.module.css";

export interface IIconProps {
  image: string;
  alt?: string;
}

export const Icon = ({ image, alt = "Иконка" }: IIconProps) => {
  return (
    <div className={styles.icon}>
      <img src={image} alt={alt} />
    </div>
  );
};
