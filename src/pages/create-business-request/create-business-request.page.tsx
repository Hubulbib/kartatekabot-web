import { observer } from "mobx-react-lite";
import { InputLabel } from "../../components/input-label/input-label.component";
import { Select } from "../../components/select/select.component";
import styles from "./create-business-request.module.css";
import { useContext, useState } from "react";
import { Context } from "../../context";
import { SocialNetworkRequest } from "../../entities/types";
import { Popper } from "../../components/popper/popper.component";
import { INSTAGRAM_BLOCKED_TEXT } from "../../utils/const";
import { ColorButton } from "../../components/color-button/color-button.component";
import { useNavigate } from "react-router-dom";

export const CreateBusinessRequest = observer(() => {
  const {
    userStore: { createBusinessRequest },
  } = useContext(Context);
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [socialNetwork, setSocialNetwork] = useState<SocialNetworkRequest>(
    SocialNetworkRequest.INSTAGRAM
  );

  return (
    <div className={styles.createBusinessRequest}>
      <h2>Заявка</h2>
      <div className={styles.inputs}>
        <InputLabel
          label="Название кафе"
          value={name}
          setValue={setName}
          popperText={"В приложении или предложенное вами"}
        />
        <InputLabel
          label="Username кафе в соцсети"
          value={username}
          setValue={setUsername}
          popperText={
            "С него вы должны будете отправить сгенерированный код для подтверждения владения"
          }
        />
        <div className={styles.select}>
          <Select<SocialNetworkRequest>
            city={socialNetwork}
            setCity={setSocialNetwork}
            isAll={false}
            items={Object.values(SocialNetworkRequest).map((el) => ({
              key: el,
              value: el,
            }))}
          />
          <Popper text={INSTAGRAM_BLOCKED_TEXT} />
        </div>
      </div>
      <ColorButton
        text="Подать заявку"
        disabled={!(name && username && socialNetwork)}
        onClick={async () => {
          await createBusinessRequest({
            cafeName: name,
            cafeUsername: username,
            socialNetwork,
          });
          navigate("/business/requests");
        }}
      />
    </div>
  );
});
