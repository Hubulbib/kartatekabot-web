import { useNavigate } from "react-router-dom";
import styles from "./mini-card.module.css";
import type { Cafe } from "../../entities/types";
import ShopImage from "../../assets/shop.svg";

export const MiniCard = ({ data }: { data: Cafe }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/cafe/${data.id}`)}
      key={data.name + data.address}
      className={styles.coffeeMiniCard}
    >
      <div className={styles.coffeeMiniAvatar}>
        <img src={data.avatar || ShopImage} alt="Логотип" />
      </div>
      <div className={styles.coffeeMiniInfo}>
        <h2>{data.name}</h2>
        <h4>
          {data.address[0] || ""}
          {data.address.length > 1 ? (
            <span> и еще {data.address.length - 1}</span>
          ) : null}
        </h4>
      </div>
    </div>
  );
};
