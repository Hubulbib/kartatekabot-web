import { useRef } from "react";
import styles from "./media-input.module.css";
import { Popper } from "../popper/popper.component";

export const MediaInput = ({
  value,
  previewUrl,
  onChange,
  label = "Медиа",
  canDelete = false,
  popperText,
}: {
  value: File | null;
  previewUrl?: string; // текущее превью из БД
  onChange: (f: File | null) => void;
  label?: string;
  canDelete?: boolean;
  popperText?: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const url = value ? URL.createObjectURL(value) : previewUrl || "";

  return (
    <div className={styles.mediaInput}>
      <div>
        <label>{label}</label>
        {popperText ? <Popper text={popperText} /> : <></>}
      </div>
      {url && (
        <div className={styles.imageContainer}>
          <img
            src={url}
            alt={label}
            className={styles.mediaImage}
            onClick={() => inputRef.current?.click()}
          />
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className={styles.hiddenInput}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onChange(file);
            }}
          />
          {canDelete ? (
            <button
              type="button"
              className={styles.button}
              onClick={() => onChange(null)}
            >
              Удалить медиа
            </button>
          ) : (
            <></>
          )}
        </div>
      )}
      {!url && (
        <>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className={styles.hiddenInput}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onChange(file);
            }}
          />
          <button
            type="button"
            className={styles.button}
            onClick={() => inputRef.current?.click()}
          >
            Выбрать медиа
          </button>
        </>
      )}
    </div>
  );
};
