import React, { useState, useEffect } from "react";
import styles from "./Loading.module.css";
import Container from "./Container";
import { BeatLoader } from "react-spinners";

function LoadingPage({ robotImage }) {
    const tips = [
        "웜톤은 골드 액세서리와 잘 어울립니다.",
        "쿨톤은 실버 액세서리가 더 빛납니다.",
        "퍼스널 컬러는 메이크업 선택에도 중요합니다.",
        "자신에게 맞는 색상은 피부 톤을 더 밝게 만들어줍니다.",
        "쿨톤은 선명한 색상을 추천합니다.",
        "웜톤은 따뜻한 색조가 매력적입니다.",
        "퍼스널 컬러로 계절에 어울리는 스타일을 완성해보세요!",
        "헤어 컬러도 퍼스널 컬러에 맞추면 돋보입니다.",
        "퍼스널 컬러는 타인의 첫인상에 영향을 줍니다.",
    ];

    const [currentTip, setCurrentTip] = useState(tips[0]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTip((prevTip) => {
                const currentIndex = tips.indexOf(prevTip);
                const nextIndex = (currentIndex + 1) % tips.length;
                return tips[nextIndex];
            });
        }, 2000);

        return () => clearInterval(interval);
    }, [tips]);

    return (
        <Container className={styles.container}>
            <div className={styles.figure}>
                <img src={robotImage} alt="robot" />
            </div>
            <div className={styles.textcontainer}>
                <p>퍼스널 컬러 진단 중...</p>
                <p className={`${styles.tip} ${styles.fade}`}>{currentTip}</p>
                <BeatLoader color="#FF5152" size={50} className={styles.loader} />
            </div>
        </Container>
    );
}

export default LoadingPage;
