import { useNavigate } from "react-router-dom";
import styles from "./mini-card.module.css";
import type { Cafe } from "../../entities/types";

export const MiniCard = ({ data }: { data: Cafe }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/cafe/${data.id}`)}
      key={data.name + data.address}
      className={styles.cafeMiniCard}
    >
      <img src={data.avatar} alt="Логотип" />
      <h2>{data.name}</h2>
    </div>
  );
};
