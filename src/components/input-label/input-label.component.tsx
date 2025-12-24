import { type SetStateAction } from "react";
import styles from "./input-label.module.css";
import { formatPhone } from "../../utils/helpers";
import { Popper } from "../popper/popper.component";

export const InputLabel = ({
  value,
  setValue,
  label,
  type = "text",
  placeholder,
  disabled = false,
  popperText,
}: {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  disabled?: boolean;
  placeholder?: string;
  popperText?: string;
}) => {
  return (
    <div className={styles.inputLabel}>
      <div>
        <label>{label}</label>
        {popperText ? <Popper text={popperText} /> : <></>}
      </div>
      <input
        placeholder={placeholder || ""}
        type={type}
        value={value}
        onChange={(e) => {
          if (type === "tel") setValue(formatPhone(e.target.value));
          else setValue(e.target.value);
        }}
        disabled={disabled}
      />
    </div>
  );
};
