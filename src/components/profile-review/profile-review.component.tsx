import styles from "./profile-review.module.css";
import ArrowImage from "../../assets/arrow-next.svg";
import type { Cafe, Review } from "../../entities/types";
import { formatDate } from "../../utils/helpers";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ShopImage from "../../assets/shop.svg";

export const ProfleReview = ({
  review,
}: {
  review: Review & { cafe: Cafe };
}) => {
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
          <img src={review.cafe.avatar || ShopImage} alt="Фото" />
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
              {review?.criteria?.map((el) => (
                <li key={el.id}>
                  <span>{el.mark}</span>
                  <h5>{el.criteria.name}</h5>
                </li>
              ))}
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
