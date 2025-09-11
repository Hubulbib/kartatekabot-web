import { observer } from "mobx-react-lite";
import styles from "./cafe.module.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context";
import { useNavigate, useParams } from "react-router-dom";
import { BottomSheet } from "../../components/bottom-sheet/bottom-sheet.component";
import { CreateNewReview } from "../../components/create-review/create-review.component";
import { CafeReview } from "../../components/cafe-review/cafe-review.component";

export const CafePage = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [sheetContent, setSheetContent] = useState<React.ReactNode>(null);

  const {
    cafeStore: { cafe, getCafe },
  } = useContext(Context);

  const openReviewSheet = () => {
    setSheetContent(<CafeReview cafe={cafe} />);
    setIsBottomSheetOpen(true);
  };

  const openLocationSheet = () => {
    setSheetContent(
      <div className="sheetContent">
        <h2>Локации</h2>
        <ul>
          {cafe?.address.map((el, ind) => (
            <li key={ind}>{el}</li>
          ))}
        </ul>
      </div>
    );
    setIsBottomSheetOpen(true);
  };

  const openCreateReviewSheet = () => {
    setSheetContent(
      <CreateNewReview
        cafeId={+id!}
        onClose={() => setIsBottomSheetOpen(false)}
      />
    );
    setIsBottomSheetOpen(true);
  };

  useEffect(() => {
    if (id) getCafe(+id);
    else navigate("/");
  }, []);

  return (
    <div className={styles.cafePage}>
      <div>
        <img src={cafe?.avatar} alt="Логотип" />
      </div>
      <h1>{cafe?.name}</h1>
      <h4>{cafe?.city.name}</h4>
      <p>{cafe?.description}</p>
      <div className={styles.cafeLocationList}>
        <div onClick={openReviewSheet}>
          <h4>⭐ {cafe?.score?.toPrecision(3) || 0}</h4>
          <h6>
            {cafe?.reviews.length} Отзывов {">"}
          </h6>
        </div>
        <div onClick={openLocationSheet}>
          {cafe?.address.length && cafe.address.length > 1 ? (
            <>
              <h4>{cafe.address[0]}</h4>
              <h6>
                и еще <span>{cafe.address.length - 1}</span> локаций {">"}
              </h6>
            </>
          ) : (
            <>
              <h4>{cafe?.address[0] || ""}</h4>
            </>
          )}
        </div>
      </div>
      <div className={styles.cafePageButton}>
        <button onClick={openCreateReviewSheet}>✍️ Написать отзыв</button>
      </div>
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => {
          setIsBottomSheetOpen(false);
        }}
      >
        {sheetContent}
      </BottomSheet>
    </div>
  );
});
