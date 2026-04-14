import { ReportType, type Review as ReviewType } from "../../entities/types";
import { NAME_LIST } from "../../utils/const";
import { formatDate } from "../../utils/helpers";
import PersonImage from "../../assets/profile.svg";
import styles from "./review.module.css";
import { useState } from "react";
import { DropdownMenu } from "../dropdown-menu/dropdown-menu.component";
import { BottomSheet } from "../bottom-sheet/bottom-sheet.component";
import { CreateReport } from "../create-report/create-report.component";

/**
 * Компонент отображения одного пользовательского отзыва.
 *
 * Содержит:
 * - псевдоним автора (для визуальной анонимизации в интерфейсе),
 * - дату публикации,
 * - список оценок по критериям,
 * - текст отзыва и сценарий отправки жалобы.
 */
export const Review = ({ review }: { review: ReviewType }) => {
  // Имя выбирается случайно из предопределенного набора для унифицированного отображения в ленте.
  const [name, _] = useState(
    NAME_LIST[Math.floor(Math.random() * NAME_LIST.length)]
  );
  // BottomSheet хранит активный контент модального окна (например, форму жалобы).
  const [bottomSheet, setBottomSheet] = useState<any>(null);

  return (
    <>
      <div className={styles.review}>
        <section className={styles.reviewHead}>
          <div>
            <div>
              <img src={PersonImage} alt="Пользователь" />
            </div>
            <div>
              <h3>{name}</h3>
              <h6>{formatDate(new Date(review.createdAt))}</h6>
            </div>
          </div>
          <div>
            <DropdownMenu
              elements={[
                {
                  text: "Пожаловаться",
                  onClick: () =>
                    setBottomSheet(
                      <CreateReport
                        type={ReportType.REVIEW}
                        onClose={() => setBottomSheet(null)}
                      />
                    ),
                },
              ]}
            />
          </div>
        </section>
        <section className={styles.reviewInfo}>
          <ul>
            {review.criteria.map((el) => (
              <li>
                <span>{el.mark}</span>
                <h5>{el.criteria.name}</h5>
              </li>
            ))}
          </ul>
          <p>{review.text}</p>
        </section>
      </div>
      <BottomSheet isOpen={!!bottomSheet} onClose={() => setBottomSheet(null)}>
        {bottomSheet}
      </BottomSheet>
    </>
  );
};
