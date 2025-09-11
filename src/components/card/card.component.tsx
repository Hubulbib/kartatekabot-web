import { useNavigate } from "react-router-dom";
import type { Cafe } from "../../entities/types";
import styles from "./card.module.css";

interface CardProps {
  data: Cafe & { score: number };
  ind: number;
}

export const Card = ({ data, ind }: CardProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/cafe/${data.id}`)}
      key={data.name + data.address}
      className={styles.coffeeCard}
    >
      <div className={styles.coffeeHead}>
        <span>№ {ind + 1}</span>
        <div>
          <img src={data.avatar} alt="Логотип" />
        </div>
      </div>
      <div className={styles.coffeeInfo}>
        <h2>{data.name}</h2>
        <h4>
          {data.address[0] || ""}
          {data.address.length > 1 ? (
            <span>и еще {data.address.length - 1}</span>
          ) : null}
        </h4>
        <h3 className={styles.coffeeScore}>{data.score.toPrecision(3)}</h3>
      </div>
    </div>
  );
};
