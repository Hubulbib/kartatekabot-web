import { useLocation } from "react-router-dom";
import styles from "./nav.module.css";

export const NavBar = () => {
  const location = useLocation();
  //const navigate = useNavigate();

  const getTitle = (): string => {
    if (location.pathname === "/") {
      return "Рейтинг лучших кофеен";
    }
    return "";
  };

  if (location.pathname === "/") {
    return (
      <nav className={styles["nav"]}>
        <h1>{getTitle()}</h1>
        <h5>{}</h5>
      </nav>
    );
  }
};
