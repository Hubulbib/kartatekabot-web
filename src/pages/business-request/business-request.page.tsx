import { observer } from "mobx-react-lite";
import styles from "./business-request.module.css";
import { useContext, useEffect } from "react";
import { Context } from "../../context";
import { Skeleton } from "../../components/skeleton/skeleton.component";
import { BusinessRequest } from "../../components/business-request/business-request.component";

export const BusinessRequestPage = observer(() => {
  const {
    userStore: { businessRequestList, getBusinessRequestList, isUserLoading },
  } = useContext(Context);

  useEffect(() => {
    getBusinessRequestList();
  }, []);

  if (isUserLoading) {
    return <Skeleton />;
  } else if (businessRequestList.length === 0) {
    <div className={styles.businessRequestPage}>
      <h2>Вы пока не оставляли заявок 🥱</h2>
    </div>;
  }

  return (
    <div className={styles.businessRequestPage}>
      <h2>Мои заявки</h2>
      <ul>
        {businessRequestList?.map((el) => (
          <li key={el.id}>
            <BusinessRequest data={el} />
          </li>
        ))}
      </ul>
    </div>
  );
});
