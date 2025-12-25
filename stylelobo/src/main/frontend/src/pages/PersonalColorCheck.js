import React, { useState } from "react";
import Container from "../components/Container";
import styles from "./PersonalColorCheck.module.css";
import { useNavigate } from "react-router-dom";

function PersonalColorCheck() {
  const navigate = useNavigate();
  const navPerColCheck = () => {
    navigate("/personal-image-upload");
  };
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  return (
    <>
      <Container className={styles.container}>
        <div className={styles.texts}>
          <div className={styles.heading}>
            <strong>진단 전 체크사항</strong>
            <p>*다음 사항들을 반드시 지켜주셔야 정확한 측정이 가능해요!</p>
          </div>
          <div className={styles.description}>
            <strong>1. 조명</strong>
            <br />
            <div className={styles.subDescription}>
              * 흰색, 자연광 아래에서 진단을 해주셔야 돼요! <br />
              * 어두운 곳이나 노랑색 조명 아래에서 촬영 시 정확한 진단이
              어렵습니다😢
              <br />* 정확하게 촬영하려면 맑은 날 낮에 실내에서 창을 바라보면서
              찍어야 해요.
            </div>
          </div>

          <div className={styles.description}>
            <strong>2. 메이크업</strong>
            <br />
            <div className={styles.subDescription}>
              * 메이크업 하지 않은 얼굴로 측정하는 것이 정확해요!
              <br />* 헤어 염색이나 눈썹 염색 등 하지 않은 상태일 때가 더
              좋답니다😊
            </div>
          </div>

          <div className={styles.description}>
            <strong>3. 이목구비</strong>
            <br />
            <div className={styles.subDescription}>
              * 안경을 벗고 계신가요? 안경을 쓰면 정확한 측정이 어려워요.🥲
              <br />
              * 앞머리가 눈썹이나 눈을 가리면 측정이 어렵답니다...
              <br />* 정면에서 이목구비가 뚜렷하게 보여야 정확한 측정을 할 수
              있어요!
            </div>
          </div>

          <div className={styles.ending}>
            <label className={styles.checkboxLabel}>
              <strong>위 사항들을 모두 확인하셨나요? </strong>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className={styles.checkbox}
              />
            </label>
          </div>
          {isChecked && (
            <button className={styles.startButton} onClick={navPerColCheck}>
              ▶ 그럼 진단하러 가볼까요?
            </button>
          )}
        </div>
      </Container>
    </>
  );
}

export default PersonalColorCheck;
