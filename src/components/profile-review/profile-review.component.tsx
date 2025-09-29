import styles from "./profile-review.module.css";
import ArrowImage from "../../assets/arrow-next.svg";
import type { Review } from "../../entities/types";
import { formatDate } from "../../utils/helpers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProfleReview = ({ review }: { review: Review }) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={styles.profileReview} onClick={toggleExpand}>
      <div className={styles.profileMainContent}>
        <div
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/cafe/${review.cafe.id}`);
          }}
        >
          <img src={review.cafe.avatar} alt="Фото" />
        </div>
        <div>
          <h2>{review.cafe.name}</h2>
          <h6>{formatDate(new Date(review.createdAt))}</h6>
        </div>
        <div>
          <img
            src={ArrowImage}
            alt=">"
            className={isExpanded ? styles.arrowRotated : ""}
          />
        </div>
      </div>
      {isExpanded && (
        <div className={styles.expandedContent}>
          <div className={styles.criteria}>
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
          </div>
          {review.text && (
            <div className={styles.reviewText}>
              <p>{review.text}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
