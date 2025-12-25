import { useState } from "react";
import Container from "../components/Container";
import LoadingPage from "../components/Loading";
import Robot from "../assets/robot.png";
import styles from "./FavDiagnosis.module.css";
import Casual from "../assets/Casual.png";
import Street from "../assets/Street.png";
import Vintage from "../assets/Vintage.png";
import Normcore from "../assets/Normcore.png";
import Classic from "../assets/Classic.png";
import Feminine from "../assets/Feminine.png";
import Minimal from "../assets/Minimal.png";
import Maximal from "../assets/Maximal.png";
import Sporty from "../assets/Sporty.png";
import Ethnic from "../assets/Ethnic.png";
import Layered from "../assets/Layered.png";
import Dandy from "../assets/Dandy.png";
import Modern from "../assets/Modern.png";
import Avant from "../assets/Avant.png";
import AMCS from "../assets/AMCS.png";
import hourglass from "../assets/hourglass.svg";
import apple from "../assets/apple.svg";
import square from "../assets/square.svg";
import retangle from "../assets/retangle.svg";
import invertedTriangle from "../assets/invertedTriangle.svg";
import pear from "../assets/pear.svg";
import ovalface from "../assets/ovalface.svg";
import squareface from "../assets/squareface.svg";
import diaface from "../assets/diaface.svg";
import invertTriangleface from "../assets/invertTriangleface.svg";
import circleface from "../assets/circleface.svg";
import heartface from "../assets/heartface.svg";
import eggface from "../assets/eggface.svg";

import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function FavoriteDiagnosis() {
  const navigate = useNavigate();
  const [hoveredTag, setHoveredTag] = useState(null);
  const [hoveredStyleTag, setHoveredStyleTag] = useState(null);
  const [hoveredFaceTag, setHoveredFaceTag] = useState(null);
  const [selectedBodyType, setSelectedBodyType] = useState(null); // 체형 선택 상태
  const [selectedFaceType, setSelectedFaceType] = useState(null); // 얼굴형 선택 상태
  const [selectedStyle, setSelectedStyle] = useState(null); // 스타일 선택 상태
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const tags = [
    { label: "캐주얼", image: Casual },
    { label: "스트릿", image: Street },
    { label: "빈티지", image: Vintage },
    { label: "놈코어", image: Normcore },
    { label: "클래식", image: Classic },
    { label: "페미닌", image: Feminine },
    { label: "미니멀", image: Minimal },
    { label: "맥시멀", image: Maximal },
    { label: "스포티", image: Sporty },
    { label: "에스닉", image: Ethnic },
    { label: "레이어드", image: Layered },
    { label: "댄디", image: Dandy },
    { label: "모던", image: Modern },
    { label: "아방가르드", image: Avant },
    { label: "아메카지", image: AMCS },
  ];

  const tags2 = [
    { label: "삼각체형", image: pear },
    { label: "역삼각형체형", image: invertedTriangle },
    { label: "스트레이트체형", image: retangle },
    { label: "사각체형", image: square },
    { label: "모래시계형", image: hourglass },
    { label: "둥근체형", image: apple },
  ];

  const tags3 = [
    { label: "길쭉한형", image: ovalface },
    { label: "사각형", image: squareface },
    { label: "다이아몬드형", image: diaface },
    { label: "역삼각형", image: invertTriangleface },
    { label: "둥근형", image: circleface },
    { label: "하트형", image: heartface },
    { label: "계란형", image: eggface },
  ];

  const handleMouseEnterShape = (tag) => {
    setHoveredTag(tag);
  };

  const handleMouseLeaveShape = () => {
    setHoveredTag(null);
  };

  const handleMouseEnterStyle = (tag) => {
    setHoveredStyleTag(tag);
  };

  const handleMouseLeaveStyle = () => {
    setHoveredStyleTag(null);
  };

  const handleMouseEnterFace = (tag) => {
    setHoveredFaceTag(tag);
  };

  const handleMouseLeaveFace = () => {
    setHoveredFaceTag(null);
  };

  const handleBodyTypeClick = (tag) => {
    if (selectedBodyType && selectedBodyType.label === tag.label) {
      return; // 아무 동작도 하지 않음
    }
    setSelectedBodyType(tag);
  };

  const handleFaceTypeClick = (tag) => {
    if (selectedFaceType && selectedFaceType.label === tag.label) {
      return; // 아무 동작도 하지 않음
    }
    setSelectedFaceType(tag);
  };

  const handleStyleClick = (tag) => {
    if (selectedStyle && selectedStyle.label === tag.label) {
      return; // 아무 동작도 하지 않음
    }
    setSelectedStyle(tag);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // 로딩 시작
    setTimeout(() => {
      setLoading(false); // 로딩 종료
      navigate("/consulting/favorite/result"); // 결과 페이지로 이동
    }, 2000); // 2초 대기
  };

  if (loading) return <LoadingPage robotImage={Robot} />;
  return (
    <>
      <div className={styles.bg} />
      <Container className={styles.container}>
        <div className={styles.heading}>
          <strong> 당신의 취향 스타일을 알려주세요!</strong>
        </div>
        <p className={styles.description}>
          <strong>
            평소에 당신이 즐겨입던 스타일과 당신이 입고 싶은 스타일을 입력하시면
            <br></br> 이에 대해서 ai가 진단해주고 당신의 스타일에 대해서
            알려줄거예요!
          </strong>
        </p>

        <div className={styles.texts}>
          1. 당신의 체형은 무엇인가요?{" "}
          <span className={styles.description}>(중복 불가)</span>
        </div>
        <Container className={styles.tagContainer}>
          {tags2.map((tag, index) => (
            <span
              key={index}
              className={`${styles.tag} ${
                selectedBodyType && selectedBodyType.label === tag.label
                  ? styles.selectedTag
                  : ""
              }`}
              onMouseEnter={() => handleMouseEnterShape(tag)}
              onMouseLeave={handleMouseLeaveShape}
              onClick={() => handleBodyTypeClick(tag)} // 체형 선택 핸들러
            >
              {tag.label}
              {selectedBodyType && selectedBodyType.label === tag.label && (
                <span
                  className={styles.closeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedBodyType(null); // 선택 해제
                  }}
                >
                  {" "}
                  ×{" "}
                </span>
              )}
            </span>
          ))}
        </Container>

        {/* 체형에 대한 미리보기 이미지 */}
        <Container
          className={`${styles.hoverImageContainer} ${
            hoveredTag && hoveredTag.image ? styles.show : ""
          }`}
        >
          {hoveredTag && hoveredTag.image && (
            <img
              src={hoveredTag.image}
              alt={hoveredTag.label}
              className={styles.hoverImage}
            />
          )}
        </Container>

        <div className={styles.texts}>
          2. 당신의 얼굴형은 무엇인가요?{" "}
          <span className={styles.description}>(중복 불가)</span>
        </div>
        <Container className={styles.tagContainer}>
          {tags3.map((tag, index) => (
            <span
              key={index}
              className={`${styles.tag} ${
                selectedFaceType && selectedFaceType.label === tag.label
                  ? styles.selectedTag
                  : ""
              }`}
              onMouseEnter={() => handleMouseEnterFace(tag)} // 얼굴형 hover 핸들러 추가
              onMouseLeave={handleMouseLeaveFace} // 얼굴형 hover 해제 핸들러 추가
              onClick={() => handleFaceTypeClick(tag)} // 얼굴형 선택 핸들러
            >
              {tag.label}
              {selectedFaceType && selectedFaceType.label === tag.label && (
                <span
                  className={styles.closeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFaceType(null); // 선택 해제
                  }}
                >
                  {" "}
                  ×{" "}
                </span>
              )}
            </span>
          ))}
        </Container>

        {/* 얼굴형에 대한 미리보기 이미지 */}
        <Container
          className={`${styles.hoverImageContainer} ${
            hoveredFaceTag && hoveredFaceTag.image ? styles.show : ""
          }`}
        >
          {hoveredFaceTag && hoveredFaceTag.image && (
            <img
              src={hoveredFaceTag.image}
              alt={hoveredFaceTag.label}
              className={styles.hoverImage}
            />
          )}
        </Container>

        <div className={styles.texts}>
          3. 당신이 평소에 즐겨입는 스타일은 무엇인가요?{" "}
          <span className={styles.description}>(중복 불가)</span>
        </div>
        <Container className={styles.tagContainer2}>
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`${styles.tag} ${
                selectedStyle && selectedStyle.label === tag.label
                  ? styles.selectedTag
                  : ""
              }`}
              onMouseEnter={() => handleMouseEnterStyle(tag)}
              onMouseLeave={handleMouseLeaveStyle}
              onClick={() => handleStyleClick(tag)} // 스타일 선택 핸들러
            >
              {tag.label}
              {selectedStyle && selectedStyle.label === tag.label && (
                <span
                  className={styles.closeButton}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedStyle(null); // 선택 해제
                  }}
                >
                  {" "}
                  ×{" "}
                </span>
              )}
            </span>
          ))}
        </Container>

        {/* 스타일에 대한 미리보기 이미지 */}
        <Container
          className={`${styles.hoverImageContainer} ${
            hoveredStyleTag && hoveredStyleTag.image ? styles.show : ""
          }`}
        >
          {hoveredStyleTag && hoveredStyleTag.image && (
            <img
              src={hoveredStyleTag.image}
              alt={hoveredStyleTag.label}
              className={styles.hoverImage}
            />
          )}
        </Container>

        <div className={styles.texts}>
          4. 당신이 입고싶은 스타일에 대해서 설명해주세요!
        </div>
        <Container className={styles.textcontainer}>
          <textarea
            className={styles.textarea}
            placeholder={`당신이 좋아하는 스타일이나 평소에 입고싶은 스타일에 대해서 자유롭게 적어주세요!
작성된 글에 기반해서 당신이 원하는 스타일을 추천해드려요!`}
            value={inputText}
            onChange={handleInputChange}
          />
        </Container>
        <Container className={styles.buttoncontainer}>
          <Button className={styles.button} onClick={handleSubmit}>
            ▶ 진단 결과 보러가기
          </Button>
        </Container>
      </Container>
    </>
  );
}

export default FavoriteDiagnosis;
