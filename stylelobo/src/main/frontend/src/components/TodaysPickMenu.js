import { useCallback, useState } from "react";
import styles from "./TodaysPickMenu.module.css";

function TodaysPickMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div
      className={styles.TodaysPickMenu}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a className={styles.icon}>Today's Pick</a>
      {isOpen && (
        <ul
          className={styles.popup}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <li className={styles.item}>미정</li>
        </ul>
      )}
    </div>
  );
}

export default TodaysPickMenu;
