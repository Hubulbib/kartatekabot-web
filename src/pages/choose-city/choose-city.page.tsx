import { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../context";
import { Search } from "../../components/search/search.component";
import styles from "./choose-city.module.css";
import { type City } from "../../entities/types";
import { useNavigate } from "react-router-dom";

export const ChooseCity = observer(() => {
  const [city, setCity] = useState("");
  const [cityList, setCityList] = useState<City[]>([]);

  const navigate = useNavigate();

  const {
    userStore: { user, getUser, cities, getCityList, editUserCity },
  } = useContext(Context);

  useEffect(() => {
    getCityList();
    getUser();
  }, []);

  useEffect(() => {
    setCityList(cities);
  }, [cities]);

  useEffect(() => {
    setCityList(cities.filter((el) => el.name.includes(city)));
  }, [city]);

  const onClickCity = async (cityId: number) => {
    await editUserCity(cityId.toString());
    user?.criteria ? navigate("/profile") : navigate("/choose-priorities");
  };

  return (
    <div className={styles.chooseCity}>
      <div className={styles.chooseCitySearch}>
        <Search value={city} setValue={setCity} placeholder={"Поиск города"} />
      </div>
      <div className={styles.chooseCityPopular}>
        <h3>Популярные города</h3>
        <ul>
          {cityList.map((el) => (
            <li key={el.id} onClick={() => onClickCity(el.id)}>
              {el.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
});
