import { useCallback, useState } from "react";
import userIcon from "../assets/user.png";
import styles from "./UserMenu.module.css";
import { useNavigate } from "react-router-dom";

function UserMenu({ userName, userGender, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsOpen(false);
  }, []);

  const navToLogin = () => {
    navigate("/auth/login");
  };

  const navToSignup = () => {
    navigate("/auth/signup");
  };

  return (
    <div
      className={styles.userMenu}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <img src={userIcon} alt="유저 메뉴" className={styles.icon} />
      {isOpen && (
        <ul
          className={styles.popup}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {userName ? (
            <>
              <li className={styles.item}>
                <strong>{userName}</strong>
              </li>
              <li
                className={styles.item}
                onClick={() => {
                  onLogout();
                  setIsOpen(false); // 로그아웃 후 메뉴 닫기
                }}
              >
                로그아웃
              </li>
            </>
          ) : (
            <>
              <li className={styles.item} onClick={navToSignup}>
                회원가입
              </li>
              <li className={styles.item} onClick={navToLogin}>
                로그인
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
