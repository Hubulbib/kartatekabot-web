import { useContext, useEffect, useState } from "react";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import { observer } from "mobx-react-lite";
import { Context } from "../../context";
import ProfileImage from "../../assets/profile.svg";
import { Skeleton } from "../../components/skeleton/skeleton.component";
import { SectionButton } from "../../components/section-button/section-button.component";
import GeoImage from "../../assets/geo.svg";
import SettingsImage from "../../assets/setting.svg";
import StartImage from "../../assets/star.svg";
import PriceTagImage from "../../assets/price-tag.svg";
import PlusImage from "../../assets/plus.svg";
import styles from "./profile.module.css";
import { useNavigate } from "react-router-dom";

export const ProfilePage = observer(() => {
  const navigate = useNavigate();
  const { tgWebAppData } = useLaunchParams();

  const {
    userStore: { user, getUser, isUserLoading },
  } = useContext(Context);

  const [city, setCity] = useState<string>("");

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (!city && user?.city) setCity(user.city.id.toString());
  }, [user]);

  if (isUserLoading) {
    return (
      <div className={styles.profilePage}>
        <Skeleton />
      </div>
    );
  }

  return (
    <div className={styles.profilePage}>
      {tgWebAppData?.user ? (
        <section className={styles.profileUser}>
          <img src={tgWebAppData.user?.photo_url || ProfileImage} alt="Фото" />
          <h3>{tgWebAppData.user.first_name} </h3>
          {tgWebAppData.user?.username ? (
            <h4>{tgWebAppData.user.username}</h4>
          ) : (
            <></>
          )}
        </section>
      ) : (
        <></>
      )}
      <section className={styles.profileSettings}>
        <h2>Настройки</h2>
        <ul>
          <li>
            <SectionButton
              icon={{ image: GeoImage, alt: "Гео" }}
              title={"Город"}
              subTitle={user?.city?.name || ""}
              onClick={() => navigate("/choose-city")}
            />
          </li>
          <li>
            <SectionButton
              icon={{ image: SettingsImage, alt: "Настройки" }}
              title={"Приоритеты"}
              onClick={() => navigate("/choose-priorities")}
            />
          </li>
        </ul>
      </section>
      <section className={styles.profileReviews}>
        <h2>Отзывы</h2>
        <ul>
          <li>
            <SectionButton
              icon={{ image: StartImage, alt: "Звезда" }}
              title={"Мои отзывы"}
              onClick={() => navigate("/my-reviews")}
            />
          </li>
        </ul>
      </section>
      <section className={styles.profileReviews}>
        <h2>Для бизнеса</h2>
        <ul>
          <li>
            <SectionButton
              icon={{ image: PriceTagImage, alt: "Бизнес" }}
              title={"Мои заявки"}
              onClick={() => navigate("/business/requests")}
            />
            <SectionButton
              icon={{ image: PlusImage, alt: "Заявка" }}
              title={"Заявка на доступ к бизнес-панели"}
              onClick={() => navigate("/business/requests/create")}
            />
          </li>
        </ul>
      </section>
    </div>
  );
});
