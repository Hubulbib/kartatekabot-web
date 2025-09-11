import Slider from "rc-slider";
import { useContext, useState } from "react";
import styles from "./create-review.module.css";
import { observer } from "mobx-react-lite";
import { Context } from "../../context/context";

export const CreateNewReview = observer(
  ({ cafeId, onClose }: { cafeId: number; onClose: () => void }) => {
    const [text, setText] = useState("");
    const [aroma, setAroma] = useState(1);
    const [atmosphere, setAtmosphere] = useState(1);
    const [taste, setTaste] = useState(1);
    const [speed, setSpeed] = useState(1);

    const {
      cafeStore: { createCafeReviw },
    } = useContext(Context);

    const onClickCreateReviewButton = async () => {
      await createCafeReviw(cafeId, {
        criteria: { aroma, atmosphere, taste, speed },
        text,
      });
      onClose();
    };

    return (
      <div className="sheetContent">
        <h2>Ваш отзыв</h2>
        <div className={styles.sheetContentNewReview}>
          <div>
            <label>Опишите ваш опыт</label>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div>
            <label>Оцените каждый критерий</label>
            <ul>
              <li>
                <label>Аромат</label>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  onChange={(v) => {
                    setAroma(v as number);
                  }}
                />
                <h4>{aroma}</h4>
              </li>
              <li>
                <label>Вкус</label>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  onChange={(v) => setTaste(v as number)}
                />
                <h4>{taste}</h4>
              </li>
              <li>
                <label>Атмосфера</label>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  onChange={(v) => setAtmosphere(v as number)}
                />
                <h4>{atmosphere}</h4>
              </li>
              <li>
                <label>Скорость</label>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  onChange={(v) => setSpeed(v as number)}
                />
                <h4>{speed}</h4>
              </li>
            </ul>
          </div>
          <div className={styles.sheetContentNewReviewButton}>
            <button type="button" onClick={onClickCreateReviewButton}>
              Создать
            </button>
          </div>
        </div>
      </div>
    );
  }
);
