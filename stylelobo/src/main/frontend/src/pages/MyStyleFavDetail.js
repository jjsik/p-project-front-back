import React, { useState } from "react";
import Container from "../components/Container";
import styles from "./MyStyleFavDetail.module.css";
import a from "../assets/a1.png";
import b from "../assets/a2.png";
import c from "../assets/a3.png";
import d from "../assets/a4.png";
import LeftArrow from "../assets/left-arrow.svg";
import RightArrow from "../assets/right-arrow.svg";

const ImageSlider = ({ images, date, title, tags }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    if (currentIndex < images.length - 2) {
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

function MyStyleFavDetail() {
  const images = [a, b, c, d]; // 이미지 배열
  const images2 = [a, b, c, d];
  return (
    <>
      <ImageSlider
        images={images}
        date="2024.10.21."
        title="맥시멀"
        tags="화려한게 좋고 원색이 많이 사용됐으면 좋겠어요"
      />
      <ImageSlider
        images={images2}
        date="2024.12.01."
        title="캐주얼"
        tags="내가 적었던 입고 싶은 스타일에 대한 부가 설명을 보여주기"
      />
    </>
  );
}

export default MyStyleFavDetail;
