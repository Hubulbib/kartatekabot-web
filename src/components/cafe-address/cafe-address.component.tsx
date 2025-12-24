import styles from "./cafe-address.module.css";
import { SectionButton } from "../section-button/section-button.component";
import type { City } from "../../entities/types";
import GeoImage from "../../assets/geo.svg";

export const CafeAddress = ({
  addresses,
  city,
}: {
  addresses: string[];
  city?: City;
}) => {
  return (
    <div className={styles.cafeAddress}>
      <h2>Локации</h2>
      <ul>
        {addresses.map((el) => (
          <li key={el}>
            <SectionButton
              icon={{ image: GeoImage, alt: "Гео" }}
              title={el}
              onClick={() =>
                open(
                  `https://yandex.ru/maps/?text=${
                    city?.name ? `${city.name} ` : "" + +el
                  }`
                )
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
