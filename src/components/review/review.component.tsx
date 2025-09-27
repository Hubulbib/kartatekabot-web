import type { Review as ReviewType } from "../../entities/types";
import { NAME_LIST } from "../../utils/const";
import { formatDate } from "../../utils/helpers";
import PersonImage from "../../assets/profile.svg";
import styles from "./review.module.css";
import { useState } from "react";

export const Review = ({ review }: { review: ReviewType }) => {
  const [name, _] = useState(
    NAME_LIST[Math.floor(Math.random() * NAME_LIST.length)]
  );

  return (
    <div className={styles.review}>
      <section className={styles.reviewHead}>
        <div>
          <img src={PersonImage} alt="Пользователь" />
        </div>
        <div>
          <h3>{name}</h3>
          <h6>{formatDate(new Date(review.createdAt))}</h6>
        </div>
      </section>
      <section className={styles.reviewInfo}>
        <ul>
          <li>
            <span>{review.criteria.aroma}</span>
            <h5>Аромат</h5>
          </li>
          <li>
            <span>{review.criteria.atmosphere}</span>
            <h5>Атмосфера</h5>
          </li>
          <li>
            <span>{review.criteria.taste}</span>
            <h5>Вкус</h5>
          </li>
          <li>
            <span>{review.criteria.speed}</span>
            <h5>Скорость</h5>
          </li>
        </ul>
        <p>{review.text}</p>
      </section>
    </div>
  );
};
