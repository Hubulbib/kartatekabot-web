import { useEffect, useRef, useState } from "react";
import styles from "./dropdown-menu.module.css";

export const DropdownMenu = ({
  text = "⋮",
  elements,
}: {
  text?: string;
  elements: { text: string; onClick: () => void }[];
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);
  return (
    <div ref={dropdownRef} className={styles.dropdown}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={styles.dropbtn}
      >
        {text}
      </button>
      <ul
        id="myDropdown"
        className={`${styles.dropdownContent} ${open ? styles.show : ""}`}
      >
        {elements.map((el, ind) => (
          <li
            key={ind}
            onClick={() => {
              el.onClick();
              setOpen(false);
            }}
          >
            {el.text}
          </li>
        ))}
      </ul>
    </div>
  );
};
