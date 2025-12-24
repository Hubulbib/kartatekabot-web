import { useLocation, useNavigate } from "react-router-dom";
import { NavButton } from "../nav-button/nav-button.component";
import ShopImage from "../../assets/shop.svg";
import StarImage from "../../assets/star.svg";
import ProfileImage from "../../assets/profile.svg";
import styles from "./nav.module.css";

export const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const activeNav =
    location.pathname === "/"
      ? "main"
      : location.pathname === "/catalog"
      ? "catalog"
      : "profile";
  return (
    <nav id="nav" className={styles["nav"]} data-active={activeNav}>
      <NavButton
        img={ShopImage}
        alt={"Каталог"}
        onClick={() => navigate("/catalog")}
        isActive={location.pathname === "/catalog"}
      />
      <NavButton
        img={StarImage}
        alt={"Рейтинг"}
        onClick={() => navigate("/")}
        isActive={location.pathname === "/"}
      />
      <NavButton
        img={ProfileImage}
        alt={"Профиль"}
        onClick={() => navigate("/profile")}
        isActive={location.pathname === "/profile"}
      />
    </nav>
  );
};
