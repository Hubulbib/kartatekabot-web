import { observer } from "mobx-react-lite";
import styles from "./cafe-locations.module.css";
import { useContext, useEffect } from "react";
import { Context } from "../../context";
import { SectionButton } from "../../components/section-button/section-button.component";
import GeoImage from "../../assets/geo.svg";
import { useParams } from "react-router-dom";

export const CafeLocationsPage = observer(() => {
  const { id } = useParams();

  const {
    cafeStore: { cafe, getCafe },
  } = useContext(Context);

  useEffect(() => {
    if (id && !isNaN(+id)) getCafe(+id);
  }, [id]);

  return (
    <div className={styles.cafeLocationsPage}>
      <h2>Все локации</h2>
      <ul>
        {cafe?.address.map((el) => (
          <li key={el}>
            <SectionButton
              icon={{ image: GeoImage, alt: "Гео" }}
              title={el}
              onClick={() => {}}
            />
          </li>
        ))}
      </ul>
    </div>
  );
});
