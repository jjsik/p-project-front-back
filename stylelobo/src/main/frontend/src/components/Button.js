import { useState, useEffect } from "react";
import classNames from "classnames";
import styles from "./Button.module.css";

function Button({ className, children, onClick, label, type = "button" }) {
  const [isClicked, setIsClicked] = useState(false);
  const [isMounted, setIsMounted] = useState(true); // 컴포넌트 마운트 상태 관리

  const handleClick = (e) => {
    setIsClicked(true);
    if (onClick) {
      onClick(e); // 클릭 이벤트 처리
    }

    setTimeout(() => {
      if (isMounted) {
        setIsClicked(false); // 컴포넌트가 마운트된 경우에만 상태 업데이트
      }
    }, 100); // 클릭 상태를 100ms 동안 유지
  };

  useEffect(() => {
    setIsMounted(true); // 컴포넌트가 마운트될 때
    return () => {
      setIsMounted(false); // 언마운트될 때
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      {label && <span className={styles.label}>{label}</span>}
      <button
        type={type} // 버튼 타입 설정
        className={classNames(styles.Button, className, {
          [styles.clicked]: isClicked, // 클릭 시 추가 클래스 적용
        })}
        onClick={handleClick} // 클릭 핸들러 설정
      >
        {children}
      </button>
    </div>
  );
}

export default Button;
