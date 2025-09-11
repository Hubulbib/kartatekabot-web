import { useLocation, useNavigate } from "react-router-dom";
import styles from "./nav.module.css";
import MenuImage from "../../assets/menu.svg";
import { NavButton } from "../nav-button/nav-button.component";
import ProfileImage from "../../assets/profile.svg";
import BackButtonImage from "../../assets/arrow-left.svg";

export const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getTitle = (): string => {
    if (location.pathname === "/") {
      return "Рейтинг лучших кофеен";
    } else if (location.pathname === "/profile") {
      return "Профиль";
    } else if (location.pathname.includes("/cafe")) {
      return "Кафе";
    } else if (location.pathname === "/catalog") {
      return "Каталог";
    }
    return "";
  };

  if (location.pathname === "/") {
    return (
      <nav id="nav" className={styles["nav"]}>
        <NavButton
          img={MenuImage}
          alt="Каталог"
          onClick={() => navigate("/catalog")}
        />
        <h1>{getTitle()}</h1>
        <NavButton
          img={ProfileImage}
          alt={"Профиль"}
          onClick={() => navigate("/profile")}
        />
      </nav>
    );
  } else if (
    location.pathname === "/profile" ||
    location.pathname.includes("/cafe") ||
    location.pathname === "/catalog"
  ) {
    return (
      <nav id="nav" className={styles["nav"]}>
        <NavButton
          img={BackButtonImage}
          alt={"Назад"}
          onClick={() => navigate(-1)}
        />
        <h1>{getTitle()}</h1>
      </nav>
    );
  }
};
