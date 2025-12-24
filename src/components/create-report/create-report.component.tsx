import { useContext, useState } from "react";
import { ColorButton } from "../color-button/color-button.component";
import styles from "./create-report.module.css";
import { observer } from "mobx-react-lite";
import { Context } from "../../context";
import { ReportType } from "../../entities/types";
import { TextareaLabel } from "../textarea-label/textarea-label.component";

export const CreateReport = observer(
  ({ type, onClose }: { type: ReportType; onClose?: () => void }) => {
    const {
      reportStore: { createReport },
    } = useContext(Context);

    const [text, setText] = useState<string>("");

    return (
      <div className={styles.createReport}>
        <h2>Жалоба</h2>
        <TextareaLabel value={text} setValue={setText} label="Текст" />
        <ColorButton
          text="Подать жалобу"
          disabled={!text}
          onClick={() => {
            createReport(text, type);
            if (onClose) onClose();
          }}
        />
      </div>
    );
  }
);
