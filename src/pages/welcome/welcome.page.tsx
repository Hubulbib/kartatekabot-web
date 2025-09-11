import { useContext, useEffect, useState } from "react";
import styles from "./welcome.module.css";
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Context } from "../../context/context";
import { CriteriaModal } from "../../components/criteria-modal/criteria-modal.component";
import { Select } from "../../components/select/select.component";
import type { Criteria } from "../../entities/types";

const StepOne = ({
  onNext,
  city,
  setCity,
  items,
}: {
  onNext: () => void;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  items: { key: string; value: string }[];
}) => {
  return (
    <div className={styles.welcomeStep}>
      <h2>
        Приветствуем тебя в <span>KARTATEKA</span>
      </h2>
      <h3>Шаг 1</h3>
      <Select city={city} setCity={setCity} items={items} isAll={false} />
      <div>
        <button onClick={onNext}>Далее</button>
      </div>
    </div>
  );
};

const StepTwo = ({ onFinish }: { onFinish: (criteria: Criteria) => void }) => {
  return (
    <div className={styles.welcomeStep}>
      <h3>Шаг 2</h3>
      <CriteriaModal isVisible={true} onClick={onFinish} />
    </div>
  );
};

export const WelcomePage = observer(() => {
  const navigate = useNavigate();
  const {
    userStore: { getUser, editUserCity, editUserCriteria, getCityList, cities },
  } = useContext(Context);

  const [step, setStep] = useState(1);

  const [city, setCity] = useState<string>("");

  useEffect(() => {
    getCityList();
  }, []);

  useEffect(() => {
    if (cities.length > 0) setCity(cities[0].id.toString());
  }, [cities]);

  const onClickFinish = async (criteria: Criteria) => {
    await editUserCity(city);
    await editUserCriteria(criteria);
    await getUser();
    navigate("/");
  };

  return (
    <div className={styles.WelcomePage}>
      {step === 1 && (
        <StepOne
          items={
            cities.map((el) => ({ key: el.id.toString(), value: el.name })) ||
            []
          }
          city={city}
          setCity={setCity}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && <StepTwo onFinish={onClickFinish} />}
    </div>
  );
});
