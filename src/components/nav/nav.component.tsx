import { useLocation } from "react-router-dom";
import styles from "./nav.module.css";
import ConceptLogo from "../../assets/concept-logo.png";

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
      <nav id="nav" className={styles["nav"]}>
        <img src={ConceptLogo} alt={"Concept"} />
        <h1>{getTitle()}</h1>
      </nav>
    );
  }
};
