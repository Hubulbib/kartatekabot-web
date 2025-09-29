import { observer } from "mobx-react-lite";
import styles from "./cafe.module.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import { useNavigate, useParams } from "react-router-dom";
import { BottomSheet } from "../../components/bottom-sheet/bottom-sheet.component";
import { CreateNewReview } from "../../components/create-review/create-review.component";
import { ColorButton } from "../../components/color-button/color-button.component";
import { SectionButton } from "../../components/section-button/section-button.component";
import GeoImage from "../../assets/geo.svg";
import { Review } from "../../components/review/review.component";

export const CafePage = observer(() => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState<boolean>(false);
  const [sheetContent, setSheetContent] = useState<React.ReactNode>(null);

  const {
    cafeStore: { cafe, getCafe },
  } = useContext(Context);

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
      <section className={styles.cafeAvatar}>
        <img src={cafe?.avatar} alt="Логотип" />
      </section>
      <section className={styles.cafeInfo}>
        <h1>{cafe?.name}</h1>
        <h4>{cafe?.city.name}</h4>
        <p>{cafe?.description}</p>
      </section>
      <section className={styles.cafeLocation}>
        <h2>Локации</h2>
        <ul>
          {cafe?.address.slice(0, 2).map((el, ind) => (
            <li key={ind}>
              <SectionButton
                key={el}
                icon={{ image: GeoImage, alt: "Гео" }}
                onClick={() => {}}
                title={el}
              />
            </li>
          ))}
        </ul>
        {(cafe?.address.length || 0) > 2 ? (
          <ColorButton
            styleProps={{
              backgroundColor: "rgb(var(--bage-color))",
              color: "rgb(var(--text-color))",
              fontWeight: 800,
            }}
            onClick={() => navigate(`/cafe/${id}/locations`)}
            text={"Показать все точки"}
          />
        ) : (
          <></>
        )}
      </section>
      <div className={styles.cafeReview}>
        <h2>Отзывы</h2>
        {(cafe?.reviews.length || 0) > 2 ? (
          <ul>
            {cafe?.reviews.slice(0, 2).map((el, ind) => (
              <li key={ind}>
                <Review key={el.id} review={el} />
              </li>
            ))}
          </ul>
        ) : (
          <span>Пока тут пусто 🥱 - оставьте свой отзыв</span>
        )}
        <div>
          {(cafe?.reviews.length || 0) > 2 ? (
            <ColorButton
              styleProps={{
                backgroundColor: "rgb(var(--bage-color))",
                color: "rgb(var(--text-color))",
                fontWeight: 800,
              }}
              text={"Показать все отзывы"}
              onClick={() => navigate(`/cafe/${id}/reviews`)}
            />
          ) : (
            <></>
          )}
          <ColorButton
            text={"✍️ Написать отзыв"}
            onClick={() => openCreateReviewSheet()}
          />
        </div>
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
