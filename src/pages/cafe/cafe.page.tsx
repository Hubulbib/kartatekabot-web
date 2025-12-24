import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { ImageLabelButton } from "../../components/image-label-button/image-label-button.component";
import ShopImage from "../../assets/shop.svg";
import ScheduleImage from "../../assets/schedule.svg";
import PhoneImage from "../../assets/phone.svg";
import GeoImage from "../../assets/geo.svg";
import NewsImage from "../../assets/news.svg";
import PersonImage from "../../assets/people.svg";
import PriceTagImage from "../../assets/price-tag.svg";
import styles from "./cafe.module.css";
import { Promotion } from "../../components/promotion/promotion.component";
import { CafeAddress } from "../../components/cafe-address/cafe-address.component";
import { BottomSheet } from "../../components/bottom-sheet/bottom-sheet.component";
import { CafeSchedule } from "../../components/cafe-schedule/cafe-schedule.component";
import { CafeContact } from "../../components/cafe-contact/cafe-contact.component";
import { Review } from "../../components/review/review.component";
import { Context } from "../../context";
import { Skeleton } from "../../components/skeleton/skeleton.component";
import { CreateNewReview } from "../../components/create-review/create-review.component";

export const CafePage = observer(() => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    cafeStore: {
      getCafe,
      getCafeReviews,
      getCafeSchedule,
      getCafeSocialNetworks,
      cafe,
      cafeReviews,
      cafeSchedule,
      cafeSocialNetworks,
      isCafeLoading,
    },
    postStore: { getPostList, postList, isPostLoading },
    promotionStore: { getPromotionList, promotionList, isPromotionLoading },
    userStore: { user },
  } = useContext(Context);

  const [activeTab, setActiveTab] = useState<
    "posts" | "promotions" | "reviews"
  >("promotions");

  const [bottomSheet, setBottomSheet] = useState<any>(null);

  useEffect(() => {
    if (id && +id && !isNaN(+id)) {
      getCafe(+id);
      getCafeReviews(+id);
      getPostList(+id);
      getPromotionList(+id);
      getCafeSchedule(+id);
      getCafeSocialNetworks(+id);
    }
  }, [id]);

  return (
    <>
      <div className={styles.cafePage}>
        {isCafeLoading ? (
          <Skeleton />
        ) : (
          <section className={styles.header}>
            <div className={styles.avatar}>
              <img src={cafe?.avatar || ShopImage} />
            </div>
            <div className={styles.info}>
              <h1>{cafe?.name}</h1>
              <h5>{cafe?.city?.name}</h5>
              <p>{cafe?.description}</p>
            </div>
          </section>
        )}
        <section className={styles.tools}>
          <ImageLabelButton
            img={GeoImage}
            text="Адрес"
            onClick={() =>
              setBottomSheet(<CafeAddress addresses={cafe?.address || []} />)
            }
          />
          <ImageLabelButton
            img={ScheduleImage}
            text="Расписание"
            onClick={() =>
              setBottomSheet(
                !isCafeLoading ? (
                  <CafeSchedule
                    note={cafeSchedule?.scheduleNotes || ""}
                    schedule={[
                      cafeSchedule?.scheduleMonday || "",
                      cafeSchedule?.scheduleTuesday || "",
                      cafeSchedule?.scheduleWednesday || "",
                      cafeSchedule?.scheduleThursday || "",
                      cafeSchedule?.scheduleFriday || "",
                      cafeSchedule?.scheduleSaturday || "",
                      cafeSchedule?.scheduleSunday || "",
                    ]}
                  />
                ) : (
                  <Skeleton />
                )
              )
            }
          />
          <ImageLabelButton
            img={PhoneImage}
            text="Контакты"
            onClick={() =>
              setBottomSheet(
                !isCafeLoading ? (
                  <CafeContact
                    phones={cafe?.info?.phones || []}
                    socialNetworks={cafeSocialNetworks}
                    email={cafe?.info?.email || ""}
                  />
                ) : (
                  <Skeleton />
                )
              )
            }
          />
        </section>
        <section className={styles.tabs}>
          <div
            className={`${styles.tab} ${
              activeTab === "promotions" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("promotions")}
          >
            <img src={PriceTagImage} />
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "posts" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("posts")}
          >
            <img src={NewsImage} />
          </div>
          <div
            className={`${styles.tab} ${
              activeTab === "reviews" ? styles.active : ""
            }`}
            onClick={() => setActiveTab("reviews")}
          >
            <img src={PersonImage} />
          </div>
        </section>
        {activeTab === "promotions" ? (
          promotionList.length === 0 && !isPromotionLoading ? (
            <h2 style={{ textAlign: "center" }}>Пока здесь пусто</h2>
          ) : !isPromotionLoading ? (
            <section className={styles.promotions}>
              {promotionList.map((el) => (
                <Promotion
                  key={el.id}
                  dateStart={new Date(el.dateStart)}
                  dateEnd={new Date(el.dateEnd)}
                  text={el.title}
                  image={el.media[0]}
                  onClick={() => navigate(`/promotions/${el.id}`)}
                />
              ))}
            </section>
          ) : (
            <Skeleton />
          )
        ) : null}
        {activeTab === "posts" ? (
          postList.length === 0 && !isPostLoading ? (
            <h2 style={{ textAlign: "center" }}>Пока здесь пусто</h2>
          ) : !isPostLoading ? (
            <section className={styles.posts}>
              {postList.map((el) => (
                <img
                  key={el.id}
                  src={el.media[0]}
                  onClick={() => navigate(`/posts/${el.id}`)}
                />
              ))}
            </section>
          ) : (
            <Skeleton />
          )
        ) : null}
        {activeTab === "reviews" ? (
          cafeReviews.length === 0 ? (
            <h2 style={{ textAlign: "center" }}>Пока здесь пусто</h2>
          ) : (
            <section className={styles.reviews}>
              {!cafeReviews.find((el) => el.userId === user?.id) ? (
                <div className={styles.createReview}>
                  <button
                    onClick={() =>
                      id
                        ? setBottomSheet(
                            <CreateNewReview
                              cafeId={+id}
                              onClose={() => setBottomSheet(null)}
                            />
                          )
                        : null
                    }
                  >
                    + Оставить отзыв
                  </button>
                </div>
              ) : (
                <></>
              )}
              {!isCafeLoading ? (
                cafeReviews.map((el) => <Review key={el.id} review={el} />)
              ) : (
                <Skeleton />
              )}
            </section>
          )
        ) : null}
      </div>
      <BottomSheet isOpen={!!bottomSheet} onClose={() => setBottomSheet(null)}>
        {bottomSheet}
      </BottomSheet>
    </>
  );
});
