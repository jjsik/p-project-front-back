import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyStyleMenu.module.css";

function MyStyleMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsOpen(false);
  }, []);

  const navtoFav = () => {
    navigate("/mystyle");
  };

  return (
    <div
      className={styles.MyStyleMenu}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className={styles.icon}>My Style</span>{" "}
      {/* <a> 태그를 <span>으로 변경 */}
      {isOpen && (
        <ul
          className={styles.popup}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <li className={styles.item} onClick={navtoFav}>
            나의 스타일 보고서
          </li>
        </ul>
      )}
    </div>
  );
}

export default MyStyleMenu;
