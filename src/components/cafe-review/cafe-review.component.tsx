import styles from "./cafe-review.module.css";
import { formatDate } from "../../utils/helpers";
import type { Cafe } from "../../entities/types";
import { NAME_LIST } from "../../utils/const";
import { DropdownMenu } from "../dropdown-menu/dropdown-menu.component";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { useContext } from "react";
import { Context } from "../../context/context";

export const CafeReview = ({ cafe }: { cafe: Cafe | null }) => {
  const { tgWebAppData } = useLaunchParams();

  const {
    cafeStore: { editCafeReviw },
  } = useContext(Context);

  return (
    <div className="sheetContent">
      <h2>Отзывы</h2>
      {cafe?.reviews.map((el) => (
        <div key={el.id} className={styles.sheetContentReview}>
          <div className={styles.sheetContentReviewHead}>
            <div>
              <h3>{NAME_LIST[Math.floor(Math.random() * NAME_LIST.length)]}</h3>
              <h6>{formatDate(new Date(el.createdAt))}</h6>
            </div>
            {/* {tgWebAppData?.user?.id.toString() === el?.user?.tgId ? (
              <DropdownMenu
                elements={[{ text: "Изменить", onClick: () => {} }]}
              />
            ) : (
              <></>
            )} */}
          </div>
          <div className={styles.sheetContentReviewCriteria}>
            <div>
              <span>{el.criteria.aroma}</span>
              <h5>Аромат</h5>
            </div>
            <div>
              <span>{el.criteria.atmosphere}</span>
              <h5>Атмосфера</h5>
            </div>
            <div>
              <span>{el.criteria.taste}</span>
              <h5>Вкус</h5>
            </div>
            <div>
              <span>{el.criteria.speed}</span>
              <h5>Скорость</h5>
            </div>
          </div>
          <p>{el.text}</p>
        </div>
      ))}
    </div>
  );
};
