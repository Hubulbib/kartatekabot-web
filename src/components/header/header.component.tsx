import { useLocation, useNavigate } from "react-router-dom";
import BackButtonImage from "../../assets/arrow-left.svg";
import styles from "./header.module.css";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getTitle = (): string => {
    if (location.pathname === "/") {
      return "";
    } else if (location.pathname === "/profile") {
      return "Профиль";
    } else if (location.pathname === "/my-reviews") {
      return "Мои отзывы";
    } else if (location.pathname === "/catalog") {
      return "Каталог";
    } else if (location.pathname === "/choose-city") {
      return "Выбор города";
    } else if (location.pathname === "/choose-priorities") {
      return "Выбор приоритетов";
    } else if (location.pathname.includes("/cafe/")) {
      return "Кафе";
    } else if (location.pathname.includes("/posts/")) {
      return "Публикация";
    } else if (location.pathname.includes("/promotions/")) {
      return "Акция";
    } else if (location.pathname.includes("/business/")) {
      return "Бизнес";
    }
    return "";
  };

  const getBackNavigation = () => {
    return <img src={BackButtonImage} alt={""} onClick={() => navigate(-1)} />;
  };

  if (
    location.pathname === "/" ||
    location.pathname === "/catalog" ||
    location.pathname === "/profile"
  ) {
    return <></>;
  }

  return (
    <nav id="nav-header" className={styles.navHeader}>
      {getBackNavigation()}
      <h1>{getTitle()}</h1>
    </nav>
  );
};
