import { useEffect, useRef, type SetStateAction } from "react";
import styles from "./textarea-label.module.css";

export const TextareaLabel = ({
  value,
  setValue,
  label,
}: {
  value: string;
  setValue: React.Dispatch<SetStateAction<string>>;
  label: string;
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className={styles.textareaLabel}>
      <label>{label}</label>
      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={1}
      />
    </div>
  );
};
