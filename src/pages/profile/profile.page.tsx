import { observer } from "mobx-react-lite";
import { Select } from "../../components/select/select.component";
import styles from "./profile.module.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context";
import { useLaunchParams } from "@telegram-apps/sdk-react";
import ProfileImage from "../../assets/profile.svg";
import { CriteriaModal } from "../../components/criteria-modal/criteria-modal.component";
import { initialCriteria, type Criteria } from "../../entities/types";

export const ProfilePage = observer(() => {
  const { tgWebAppData } = useLaunchParams();

  const {
    userStore: {
      cities,
      getCityList,
      user,
      getUser,
      editUserCity,
      editUserCriteria,
    },
  } = useContext(Context);

  const [city, setCity] = useState<string>("");
  const [isVisibleCriteria, setIsVisibleCriteria] = useState<boolean>(false);

  useEffect(() => {
    getCityList();
    getUser();
  }, []);

  useEffect(() => {
    if (!city && user?.city) setCity(user.city.id.toString());
  }, [user]);

  useEffect(() => {
    if (city && user?.city.id.toString() !== city) {
      editUserCity(city);
    }
  }, [city]);

  const convertToCriteriaOrder = (criteria: Criteria) => {
    return Object.entries(criteria)
      .sort(([, a], [, b]) => b - a)
      .map(([key]) => {
        const found = initialCriteria.find((item) => item.key === key);
        return { key: key as keyof Criteria, label: found?.label || key };
      });
  };

  return (
    <div className={styles.profilePage}>
      {tgWebAppData?.user ? (
        <section className={styles.profileUser}>
          <img src={tgWebAppData.user?.photo_url || ProfileImage} alt="Фото" />
          <h3>
            {tgWebAppData.user.first_name}{" "}
            {tgWebAppData.user?.username
              ? "(" + tgWebAppData.user.username + ")"
              : ""}
          </h3>
        </section>
      ) : (
        <></>
      )}
      <section className={styles.profileCity}>
        <h3>Ваш город</h3>
        <Select
          city={city}
          setCity={setCity}
          items={cities.map((el) => ({
            key: el.id.toString(),
            value: el.name,
          }))}
          isAll={false}
        />
      </section>
      <section className={styles.profileCriteria}>
        <h3>Ваши предпочтения</h3>
        <button
          onClick={() => setIsVisibleCriteria(true)}
          disabled={!!!user?.criteria}
        >
          Изменить
        </button>
        {user?.criteria ? (
          <CriteriaModal
            isVisible={isVisibleCriteria}
            onClick={(criteria) => {
              editUserCriteria(criteria);
              setIsVisibleCriteria(false);
            }}
            style={{ backdropFilter: "blur(5px)" }}
            init={convertToCriteriaOrder(user.criteria)}
          />
        ) : (
          <></>
        )}
      </section>
    </div>
  );
});
