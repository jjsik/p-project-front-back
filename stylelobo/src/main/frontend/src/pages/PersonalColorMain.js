import React, { useState, useEffect } from "react";
import Container from "../components/Container.js";
import styles from "./PersonalColorMain.module.css";
import SeasonImg from "../assets/season1.png";
import SeasonImg2 from "../assets/season2.png";
import SeasonImg3 from "../assets/season3.png";
import SeasonImg4 from "../assets/season4.png";

import Button from "../components/Button.js";
import { useNavigate } from "react-router-dom";

function PersonalColorMain() {
  const navigate = useNavigate();
  const navPerCol = () => {
    navigate("/personal-color-check");
  };

  const images = [SeasonImg, SeasonImg2, SeasonImg3, SeasonImg4];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500); // 3초마다 이미지 변경

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 interval 정리
  }, [images.length]);

  return (
    <>
      <div className={styles.bg} />
      <Container className={styles.container}>
        <div className={styles.textimagecontainer}>
          <div className={styles.texts}>
            <div className={styles.heading}>
              <strong>Personal Color</strong>
            </div>
            <p className={styles.description}>
              <strong>나의 컬러를 찾고 스타일을 추천받아보세요!</strong>
              <br />
            </p>
            <Button className={styles.button} onClick={navPerCol}>
              ▶ 진단하러 가기
            </Button>
          </div>

          <div className={styles.figure}>
            <div className={styles.imageContainer}>
              <img
                src={images[currentImageIndex]}
                alt="봄여름가을겨울"
                className={styles.image}
              />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default PersonalColorMain;
