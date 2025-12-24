import styles from "./cafe-contact.module.css";
import PhoneImage from "../../assets/phone.svg";
import MailImage from "../../assets/mail.svg";
import ChatImage from "../../assets/chat.svg";
import { SocialNetworkType } from "../../entities/types";
import { getSocialNetworkIcon } from "../../utils/helpers";
import { Popper } from "../popper/popper.component";
import { INSTAGRAM_BLOCKED_TEXT } from "../../utils/const";

export const CafeContact = ({
  phones,
  email,
  socialNetworks,
}: {
  phones: string[];
  email?: string;
  socialNetworks: { type: SocialNetworkType; link: string }[];
}) => {
  return (
    <div className={styles.cafeContact}>
      <h2>Контакты</h2>
      <section className={styles.phones}>
        <div>
          <img src={PhoneImage} />
          <h3>Для связи</h3>
        </div>
        {phones.length > 0 ? (
          <ul>
            {phones.map((el) => (
              <li key={el}>
                <a target="_blank" href={`tel:${el}`}>
                  {el}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <h3>Нет данных</h3>
        )}
      </section>
      {email ? (
        <section className={styles.email}>
          <div>
            <img src={MailImage} />
            <h3>Почта</h3>
          </div>
          <div>
            <a target="_blank" href={`mailto:${email}`}>
              {email}
            </a>
          </div>
        </section>
      ) : null}
      {socialNetworks.length > 0 ? (
        <section className={styles.socialNetworks}>
          <div>
            <img src={ChatImage} />
            <h3>Медиа</h3>
          </div>
          <ul>
            {socialNetworks.map((el) => (
              <li key={el.link} onClick={() => open(el.link)}>
                <img src={getSocialNetworkIcon(el.type)} />
                {el.type === SocialNetworkType.INSTAGRAM ? (
                  <span>*</span>
                ) : (
                  <></>
                )}
              </li>
            ))}
            <Popper text={INSTAGRAM_BLOCKED_TEXT} />
          </ul>
        </section>
      ) : (
        []
      )}
    </div>
  );
};
