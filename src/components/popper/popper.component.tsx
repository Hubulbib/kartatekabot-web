import { useEffect, useRef, useState } from "react";
import styles from "./popper.module.css";

export const Popper = ({ text }: { text?: string }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const popperRef = useRef<HTMLDivElement>(null);

  // Закрытие попапа при клике вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popperRef.current &&
        !popperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.popper} ref={popperRef}>
      <button className={styles.trigger} onClick={() => setIsOpen(!isOpen)}>
        ?
      </button>

      {isOpen && (
        <div className={styles.content}>
          <p>{text}</p>
        </div>
      )}
    </div>
  );
};
