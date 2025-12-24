import { useState } from "react";
import type { BusinessRequest as BusinessRequestType } from "../../entities/types";
import { formatDate } from "../../utils/helpers";
import ArrowImage from "../../assets/arrow-next.svg";
import styles from "./business-request.module.css";
import { ColorButton } from "../color-button/color-button.component";

export const BusinessRequest = ({ data }: { data: BusinessRequestType }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={styles.businessRequest} onClick={toggleExpand}>
      <div className={styles.profileMainContent}>
        <div>
          <h2>{data.cafeName}</h2>
          <h6>{formatDate(new Date(data.createdAt))}</h6>
        </div>
        <div>
          <img
            src={ArrowImage}
            alt=">"
            className={isExpanded ? styles.arrowRotated : ""}
          />
        </div>
      </div>
      {isExpanded && (
        <div className={styles.expandedContent}>
          <div>
            <span>username:</span>
            <h4>{data.cafeUsername}</h4>
          </div>
          <div>
            <span>соцсеть:</span>
            <h4>{data.socialNetwork}</h4>
          </div>
          <div>
            <span>код:</span>
            <h4>{data.code}</h4>
          </div>
          <div>
            <ColorButton
              text="Скопировать код"
              onClick={(e) => {
                e?.stopPropagation();
                navigator.clipboard.writeText(data.code);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};
