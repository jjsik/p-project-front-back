import React, { useState, useEffect } from "react";
import Container from "../components/Container";
import styles from "./PersonalColorConsulting.module.css";
import PersonImg from "../assets/person.png";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../components/Loading";
import Robot from "../assets/robot2.png";

function PersonalColorConsulting() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 로그인 상태 확인
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user/isLogin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.statusCode === 200 && data.data.login) {
          setIsAuthenticated(true); // 로그인 상태 설정
        } else {
          alert("로그인이 필요합니다.");
          navigate("/auth/login"); // 로그인 페이지로 리다이렉트
        }
      } catch (error) {
        console.error("로그인 상태 확인 중 오류 발생:", error);
        navigate("/auth/login"); // 오류 발생 시 로그인 페이지로 리다이렉트
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const perImgUp = () => {
    navigate("/personal-image-upload");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // 로딩 시작
    setTimeout(() => {
      setLoading(false); // 로딩 종료
      navigate("personal-color-result"); // 결과 페이지로 이동
    }, 2000); // 2초 대기
  };

  if (!isAuthenticated) {
    return null; // 로그인 상태 확인 중에는 아무것도 렌더링하지 않음
  }

  if (loading) return <LoadingPage robotImage={Robot} />;
  return (
    <>
      <Container className={styles.container}>
        <div className={styles.figure}>
          <img src={PersonImg} alt="사람" />
        </div>
      </Container>
      <div className={styles.button}>
        <button className={styles.uploadButton} onClick={perImgUp}>
          ▶ 사진 재 업로드
        </button>
      </div>
      <div className={styles.button}>
        <button className={styles.aiconsultingButton} onClick={handleSubmit}>
          ▶ ai 진단 시작
        </button>
      </div>
    </>
  );
}

export default PersonalColorConsulting;
