import Slider from "rc-slider";
import { useContext, useEffect, useState } from "react";
import styles from "./create-review.module.css";
import { observer } from "mobx-react-lite";
import { Context } from "../../context";
import { ColorButton } from "../color-button/color-button.component";
import { Select } from "../select/select.component";
import type { ReviewCriteriaOrder } from "../../entities/types";

/**
 * Форма создания пользовательского отзыва о заведении.
 *
 * Пользователь вводит текст и добавляет набор критериев с оценками,
 * после чего отзыв отправляется на сервер.
 */
export const CreateNewReview = observer(
  ({ cafeId, onClose }: { cafeId: number; onClose: () => void }) => {
    const [text, setText] = useState("");
    const [criteria, setCriteria] = useState("");
    const [criteriaOrder, setCriteriaOrder] = useState<ReviewCriteriaOrder>([]);

    const {
      cafeStore: { createCafeReviw },
      userStore: { getCriteriaList, criteriaList },
    } = useContext(Context);

    useEffect(() => {
      getCriteriaList();
    }, []);

    useEffect(() => {
      setCriteria(criteriaList[0]?.name);
    }, [criteriaList]);

    /**
     * Отправляет сформированный отзыв и закрывает BottomSheet.
     */
    const onClickCreateReviewButton = async () => {
      await createCafeReviw(cafeId, {
        criteria: criteriaOrder,
        text,
      });
      onClose();
    };

    return (
      <div className={styles.sheetContentNewReviewWrapper}>
        <h2>Ваш отзыв</h2>
        <div className={styles.sheetContentNewReview}>
          <div>
            <textarea
              placeholder={"Опишите ваш отзыв"}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div>
            <label>Выберите и оцените критерии</label>
            <div className={styles.sheetContentNewReviewCriteriaAdding}>
              <Select
                city={criteria}
                setCity={setCriteria}
                items={criteriaList.map((el) => ({
                  key: el.name,
                  value: el.name,
                }))}
                isAll={false}
              />
              <ColorButton
                text={"+"}
                onClick={() => {
                  // Ограничение ТЗ: не более 4 критериев в одном отзыве.
                  if (criteriaOrder.length > 3) return;
                  // Защита от повторного добавления одного и того же критерия.
                  if (
                    criteriaOrder.some(
                      (item) => Object.keys(item)[0] === criteria
                    )
                  )
                    return;
                  setCriteriaOrder((prev) => [...prev, { [criteria]: 1 }]);
                }}
              />
            </div>
            <ul>
              {criteriaOrder.map((el) => {
                const key = Object.keys(el)[0],
                  value = Object.values(el)[0];
                return (
                  <li key={key}>
                    <label>{key}</label>
                    <Slider
                      min={1}
                      max={10}
                      step={1}
                      onChange={(v) => {
                        const key = Object.keys(el)[0];
                        setCriteriaOrder((prev) =>
                          prev.map((item) =>
                            Object.keys(item)[0] === key
                              ? { [key]: v as number }
                              : item
                          )
                        );
                      }}
                    />
                    <h4>{value}</h4>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.sheetContentNewReviewButton}>
            <ColorButton
              text={"Очистить"}
              onClick={() => setCriteriaOrder([])}
              styleProps={{ backgroundColor: "rgb(var(--danger-color))" }}
            />
            <ColorButton text={"Создать"} onClick={onClickCreateReviewButton} />
          </div>
        </div>
      </div>
    );
  }
);
