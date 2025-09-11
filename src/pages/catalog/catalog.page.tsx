import { observer } from "mobx-react-lite";
import styles from "./catalog.module.css";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/context";
import { Search } from "../../components/search/search.component";
import { MiniCard } from "../../components/mini-card/mini-card.component";
import { type Cafe } from "../../entities/types";

export const CatalogPage = observer(() => {
  const {
    cafeStore: { catalog, getCatalog },
    userStore: { user, getUser },
  } = useContext(Context);

  const [searchText, setSearchText] = useState<string>("");
  const [cafeList, setCafeList] = useState<Cafe[]>([]);

  useEffect(() => {
    const request = async () => {
      await getUser();
      if (user?.city) await getCatalog(user?.city.name);
    };
    request();
  }, []);

  useEffect(() => {
    setCafeList(catalog);
  }, [catalog]);

  useEffect(() => {
    if (searchText) {
      setCafeList(
        catalog.filter(
          (cafe) =>
            cafe.name.includes(searchText) ||
            cafe.address.includes(searchText) ||
            cafe.description.includes(searchText)
        )
      );
    } else {
      setCafeList(catalog);
    }
  }, [searchText, catalog]);

  return (
    <div className={styles.catalogPage}>
      <Search
        value={searchText}
        setValue={setSearchText}
        placeholder="Найдите свою кофейню"
      />
      <div>
        {cafeList.map((el) => (
          <MiniCard data={el} key={el.id} />
        ))}
      </div>
    </div>
  );
});
