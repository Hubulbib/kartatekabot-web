import styles from "./welcome.module.css";
import { useNavigate } from "react-router-dom";
import { ColorButton } from "../../components/color-button/color-button.component";

export const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.welcomePage}>
      <div>
        <h2>
          Приветствуем тебя в <span>KARTATEKA</span>
        </h2>
      </div>
      <div>
        <ColorButton onClick={() => navigate("/choose-city")} text={"Далее"} />
      </div>
    </div>
  );
};
