import { Icon, type IIconProps } from "../icon/icon.component";
import styles from "./section-button.module.css";
import ArrowImage from "../../assets/arrow-next.svg";

export const SectionButton = ({
  icon,
  title,
  subTitle = "",
  onClick,
}: {
  icon: IIconProps;
  title: string;
  subTitle?: string;
  onClick: () => void;
}) => {
  return (
    <div className={styles.sectionButton} onClick={onClick}>
      <div className={styles.sectionLeft}>
        <Icon {...icon} />
      </div>
      <div className={styles.sectionCenter}>
        <h3>{title}</h3>
        {subTitle ? <h4>{subTitle}</h4> : <></>}
      </div>
      <div className={styles.sectionRight}>
        <img src={ArrowImage} alt=">" />
      </div>
    </div>
  );
};
