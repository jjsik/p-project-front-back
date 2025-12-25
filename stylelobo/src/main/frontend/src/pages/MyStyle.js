import React, { useState } from "react";
import Container from "../components/Container";
import styles from "./MyStyle.module.css";
import Mystyle from "../assets/mystyle.png";
import { useNavigate } from "react-router-dom";

function MyStyle() {
  const navigate = useNavigate();
  const PersonalDetail = () => {
    navigate("/mystyle/Personal-Detail");
  };
  const FavDetail = () => {
    navigate("/mystyle/Fav-Detail");
  };
  return (
    <>
      <Container className={styles.container}>
        <div className={styles.textimagecontainer}>
          <div className={styles.texts}>
            <div className={styles.heading}>
              <strong>퍼스널컬러 진단 결과</strong>
              <p>
                AI 이미지 분석을 통해 채도와 명도를 분석하여 사용자의 얼굴 톤을
                파악하고, <br />
                개인의 퍼스널 컬러에 맞는 스타일을 추천해드립니다.{" "}
              </p>
              <div className={styles.button}>
                <button
                  className={styles.detailButton}
                  onClick={PersonalDetail}
                >
                  자세히 보기
                </button>
              </div>
            </div>
          </div>
          <div className={styles.image}>
            <img src={Mystyle} alt="Mystyle" />
          </div>
        </div>
      </Container>

      <Container className={styles.container}>
        <div className={styles.textimagecontainer}>
          <div className={styles.texts}>
            <div className={styles.heading}>
              <strong>취향 스타일 진단 결과</strong>
              <p>
                체형과 얼굴형, 스타일을 선택한 후 사용자가 작성한 글에 기반하여{" "}
                AI가 취향을 분석하고, 그에 맞춘 맞춤형 코디를 추천합니다.
              </p>
              <div className={styles.button}>
                <button className={styles.detailButton} onClick={FavDetail}>
                  자세히 보기
                </button>
              </div>
            </div>
          </div>
          <div className={styles.image}>
            <img src={Mystyle} alt="Mystyle" />
          </div>
        </div>
      </Container>
    </>
  );
}

export default MyStyle;
