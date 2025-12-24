import { DropdownMenu } from "../../components/dropdown-menu/dropdown-menu.component";
import styles from "./promotion.module.css";
import { formatDate } from "../../utils/helpers";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import { ReportType, type Cafe } from "../../entities/types";
import { BottomSheet } from "../../components/bottom-sheet/bottom-sheet.component";
import { Skeleton } from "../../components/skeleton/skeleton.component";
import { CreateReport } from "../../components/create-report/create-report.component";

export const PromotionPage = observer(() => {
  const { id } = useParams();
  const {
    cafeStore: { cafe },
    promotionStore: { promotion, getPromotion, isPromotionLoading },
  } = useContext(Context);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [media, setMedia] = useState<string>("");
  const [dateEnd, setDateEnd] = useState<Date>();
  const [dateStart, setDateStart] = useState<Date>();
  const [condition, setCondition] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<Date>();
  const [cafeData, setCafeData] = useState<Cafe>();

  const [bottomSheet, setBottomSheet] = useState<any | null>(null);

  useEffect(() => {
    if (cafe && id) {
      getPromotion(cafe.id, +id);
    }
  }, [cafe, id]);

  useEffect(() => {
    if (promotion) {
      setTitle(promotion.title);
      setDescription(promotion.description);
      setMedia(promotion.media[0]);
      setDateEnd(promotion.dateEnd);
      setDateStart(promotion.dateStart);
      setCreatedAt(promotion.createdAt);
      if (promotion.condition) setCondition(promotion.condition);
      if (promotion.cafe) setCafeData(promotion.cafe);
    }
  }, [promotion]);

  return (
    <>
      {isPromotionLoading && !promotion ? (
        <Skeleton />
      ) : (
        <div className={styles.promotion}>
          <section className={styles.header}>
            <img src={cafeData?.avatar} />
            <h5>{cafeData?.name}</h5>
            <DropdownMenu
              elements={[
                {
                  text: "Пожаловаться",
                  onClick: () =>
                    setBottomSheet(
                      <CreateReport
                        type={ReportType.PROMOTION}
                        onClose={() => setBottomSheet(null)}
                      />
                    ),
                },
              ]}
            />
          </section>
          <section className={styles.media}>
            <img src={media} />
          </section>
          <section className={styles.info}>
            <div>
              {dateStart ? (
                <span>Начало: {formatDate(new Date(dateStart))}</span>
              ) : (
                <></>
              )}
              {dateEnd ? (
                <span>Окончание: {formatDate(new Date(dateEnd))}</span>
              ) : (
                <></>
              )}
            </div>
            <div className={styles.infoContent}>
              <h2>{title}</h2>
              <p>{description}</p>
              {condition ? <p>{condition}</p> : <></>}
            </div>
            <div className={styles.infoDate}>
              <span>{createdAt ? formatDate(new Date(createdAt)) : ""}</span>
            </div>
          </section>
        </div>
      )}
      <BottomSheet isOpen={bottomSheet} onClose={() => setBottomSheet(null)}>
        {bottomSheet}
      </BottomSheet>
    </>
  );
});
