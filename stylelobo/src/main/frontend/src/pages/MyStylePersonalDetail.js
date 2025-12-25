import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import styles from "./MyStylePersonalDetail.module.css";
import LeftArrow from "../assets/left-arrow.svg"; // 왼쪽 화살표 아이콘
import RightArrow from "../assets/right-arrow.svg"; // 오른쪽 화살표 아이콘

const ImageSlider = ({ images, date, title, tags }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <Container className={styles.container}>
      <div className={styles.textimagecontainer}>
        <div className={styles.texts}>
          <div className={styles.heading}>
            <p className={styles.date}>{date}</p>
            <strong>{title}</strong>
            <p>{tags}</p>
          </div>
        </div>
        <div className={styles.image}>
          <button className={styles.arrowButton} onClick={goToPrevious}>
            <img src={LeftArrow} alt="Previous" />
          </button>
          <div className={styles.imageContainer}>
            {images.slice(currentIndex, currentIndex + 2).map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Mystyle"
                className={styles.imageItem}
              />
            ))}
          </div>
          <button className={styles.arrowButton} onClick={goToNext}>
            <img src={RightArrow} alt="Next" />
          </button>
        </div>
      </div>
    </Container>
  );
};

function MyStylePersonalDetail() {
  const [savedStyles, setSavedStyles] = useState([]); // 초기값을 빈 배열로 설정

  useEffect(() => {
    fetch("http://localhost:8080/api/myStyle/color") // 데이터 가져오기 API 호출
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setSavedStyles(data.data); // 데이터 저장
        } else {
          console.error("API 응답 오류:", data.responseMessage);
        }
      })
      .catch((error) => {
        console.error("데이터 가져오기 실패:", error);
      });
  }, []);

  // savedStyles가 배열인지 확인하고 맵핑
  return (
    <>
      {Array.isArray(savedStyles) && savedStyles.length > 0 ? (
        savedStyles.map((style, index) => (
          <ImageSlider
            key={index}
            images={[style.faceImage]} // 이미지 URL 배열
            date={new Date(style.createAt).toLocaleDateString()} // 날짜 포맷
            title={style.colorType}
            tags={style.recommendation}
          />
        ))
      ) : (
        <div>저장된 스타일이 없습니다.</div>
      )}
    </>
  );
}

export default MyStylePersonalDetail;
