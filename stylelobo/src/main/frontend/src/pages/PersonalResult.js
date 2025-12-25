// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom"; // useNavigate 추가
// import Container from "../components/Container";
// import LoadingPage from "../components/Loading";
// import styles from "./PersonalResult.module.css";
// import save from "../assets/save.png";
// import robot from "../assets/robot2.png";
// import user from "../assets/robot3.png";
// import axios from "axios";
//
// const importAll = (r) => {
//   let images = {};
//   r.keys().forEach((item) => {
//     images[item.replace("./", "")] = r(item);
//   });
//   return images;
// };
//
// const springImages = importAll(
//     require.context(
//         "../assets/personalImage/springMan",
//         false,
//         /\.(png|jpe?g|svg)$/
//     )
// );
// const summerImages = importAll(
//     require.context(
//         "../assets/personalImage/summerMan",
//         false,
//         /\.(png|jpe?g|svg)$/
//     )
// );
// const fallImages = importAll(
//     require.context(
//         "../assets/personalImage/fallMan",
//         false,
//         /\.(png|jpe?g|svg)$/
//     )
// );
// const winterImages = importAll(
//     require.context(
//         "../assets/personalImage/winterMan",
//         false,
//         /\.(png|jpe?g|svg)$/
//     )
// );
//
// function PersonalResult() {
//   const location = useLocation();
//   const navigate = useNavigate(); // useNavigate 훅 추가
//   const { previewImage, resultData } = location.state || {};
//   const [loading, setLoading] = useState(true);
//   const [seasonImages, setSeasonImages] = useState([]);
//
//   useEffect(() => {
//     if (resultData) {
//       setLoading(false);
//       const { personalColor, gender } = resultData;

//
//       if (personalColor === "spring") {

//         setSeasonImages(
//             gender === "male"
//                 ? Object.values(springImages)
//                 : Object.values(
//                     require.context(
//                         "../assets/personalImage/springWoman",
//                         false,
//                         /\.(png|jpe?g|svg)$/
//                     )
//                 )
//         );
//       } else if (personalColor === "summer") {

//         setSeasonImages(
//             gender === "male"
//                 ? Object.values(summerImages)
//                 : Object.values(
//                     require.context(
//                         "../assets/personalImage/summerWoman",
//                         false,
//                         /\.(png|jpe?g|svg)$/
//                     )
//                 )
//         );
//       } else if (personalColor === "fall") {

//         setSeasonImages(
//             gender === "male"
//                 ? Object.values(fallImages)
//                 : Object.values(
//                     require.context(
//                         "../assets/personalImage/fallWoman",
//                         false,
//                         /\.(png|jpe?g|svg)$/
//                     )
//                 )
//         );
//       } else if (personalColor === "winter") {

//         setSeasonImages(
//             gender === "male"
//                 ? Object.values(winterImages)
//                 : Object.values(
//                     require.context(
//                         "../assets/personalImage/winterWoman",
//                         false,
//                         /\.(png|jpe?g|svg)$/
//                     )
//                 )
//         );
//       }
//

//     } else {
//       setLoading(false);
//     }
//   }, [resultData]);
//
//
//   const handleSave = () => {
//     const { previewImage, resultData } = location.state || {};
//     const { personalColor } = resultData;
//
//     const base64Image = previewImage.split('base64,')[1];
//
//     // base64 문자열을 Blob 객체로 변환
//     const byteCharacters = atob(base64Image);  // base64 디코딩
//     const byteArrays = [];
//
//     for (let offset = 0; offset < byteCharacters.length; offset++) {
//       const byteArray = byteCharacters.charCodeAt(offset);
//       byteArrays.push(byteArray);
//     }
//
// // Blob 객체 생성
//     const blob = new Blob([new Uint8Array(byteArrays)], { type: 'image/jpeg' });
//
// // Blob을 File로 변환
//     const file = new File([blob], "image.jpg", { type: 'image/jpeg' });
//
//     const formData = new FormData();
//     formData.append("image", file); // FormData에 파일 추가
//     formData.append("color", personalColor); // image 추가
//
//     // Spring 서버와 세션 기반으로 통신
//     axios
//         .post("http://localhost:8080/api/personalColor/save", formData, {
//           headers: {
//             "Content-Type": "multipart/form-data", // FormData 전송을 위한 Content-Type
//           },
//           withCredentials: true, // 세션 쿠키 포함
//         })
//         .then((response) => {
//           const data = response.data;
//           if (data.statusCode === 200) {
//             alert("저장 성공!");
//             navigate("/mystyle/Personal-Detail"); // 저장 후 상세 페이지로 이동
//           } else {
//             alert("저장 실패: " + data.responseMessage);
//           }
//         })
//         .catch((error) => {
//           console.error("저장 중 오류 발생:", error);
//           alert("저장 중 오류가 발생했습니다.");
//         });
//   };
//
//   if (loading) {
//     return <LoadingPage robotImage={robot} />;
//   }
//
//   if (!resultData) {
//     return <div>결과 데이터를 불러오지 못했습니다. 다시 시도해주세요.</div>;
//   }
//
//   return (
//       <>
//         <div className={styles.bg} />
//         <Container className={styles.container}>
//           <div className={styles.texts}>
//             <div className={styles.heading}>퍼스널 컬러 진단 결과</div>
//             <div className={styles.figure}>
//               {previewImage ? (
//                   <img src={previewImage} alt="선택한 이미지 미리보기"/>
//               ) : (
//                   <img src={user} alt="기본 이미지"/>
//               )}
//             </div>
//             <p className={styles.description}>
//               당신은 <strong>{resultData.personalColor} 톤</strong> 입니다!
//               <br/>
//               당신에게 어울리는 스타일은 다음과 같아요
//             </p>
//             <p className={styles.hashtag}>{recommendations1}</p>
//             <p className={styles.hashtag}>{recommendations2}</p>
//             <p className={styles.hashtag}>{recommendations3}</p>
//           </div>
//
//           <div className={styles.stylerecommendation}>
//             <img
//                 src={robot}
//                 alt="robot"
//                 className={styles.stylerecommendationIcon}
//             />
//             <div className={styles.stylerecommendationDetail}>
//               <div className={styles.recommendationHeader}>
//                 STYLEROBO
//                 <span className={styles.subHeader}>가 추천해주는 코디에요!</span>
//               </div>
//
//               <div className={styles.imageGrid}>
//                 {seasonImages.map((src, index) => (
//                     <img key={index} src={src} alt={`추천 스타일 ${index + 1}`} />
//                 ))}
//               </div>
//             </div>
//           </div>
//
//           <div className={styles.buttons}>
//             <button className={styles.saveButton} onClick={handleSave}>
//               <img src={save} alt="save" className={styles.buttonIcon} />
//               My Style에 저장하기
//             </button>
//           </div>
//         </Container>
//       </>
//   );
// }
//
// export default PersonalResult;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Container from "../components/Container";
import LoadingPage from "../components/Loading";
import styles from "./PersonalResult.module.css";
import save from "../assets/save.png";
import robot from "../assets/robot2.png";
import user from "../assets/robot3.png";
import axios from "axios";
import { imageSets } from "../assets/personalImage/imageData"; // 이미지 데이터 불러오기

function PersonalResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { previewImage, resultData } = location.state || {};
  const [loading, setLoading] = useState(true);
  const [recommendations1, setRecommendations1] = useState([]);
  const [recommendations2, setRecommendations2] = useState([]);
  const [recommendations3, setRecommendations3] = useState([]);
  const [seasonImages, setSeasonImages] = useState([]);

  useEffect(() => {
    if (resultData) {
      setLoading(false);
      const { personalColor, gender } = resultData;
      let recommendation1 = "";
      let recommendation2 = "";
      let recommendation3 = "";

      if (personalColor && gender) {
        setSeasonImages(imageSets[personalColor][gender === "male" ? "male" : "female"]);
        switch (personalColor) {
          case "spring":
            recommendation1 +=
                "# 아이보리 계열 # 쉬폰 or 폴리스 소재";
            recommendation2 += "# 밝은 컬러 #화사한 느낌";
            recommendation3 += "# 페미닌 & 러블리 스타일";
            break;
          case "summer":
            recommendation1 +=
                "# 연한 회색 or 소라색 계열 # 쉬폰 or 레이스 소재";
            recommendation2 += "# 차가운 컬러 #화사한 느낌";
            recommendation3 += "# 페미닌 & 캐주얼 스타일";
            break;
          case "fall":
            recommendation1 +=
                "# 갈색 계열 #가죽소재";
            recommendation2 += "# 짙은 컬러  #진중한 이미지";
            recommendation3 += "# 에스닉 & 보헤미안 스타일";
            break;
          case "winter":
            recommendation1 +=
                "# 비비드한 색상 계열 # 빳빡한 시스루 or 스웨이드 소재";
            recommendation2 += "# 화이트 & 블랙 #차갑고 모던한 느낌";
            recommendation3 += "# 오피스 & 올블랙 스타일";
            break;
          default:
            recommendation1 = "추천 스타일을 찾을 수 없습니다.";
        }
      }

      setRecommendations1(recommendation1);
      setRecommendations2(recommendation2);
      setRecommendations3(recommendation3);
    } else {
      setLoading(false);
    }
  }, [resultData]);

  const handleSave = () => {
    const { previewImage, resultData } = location.state || {};
    const { personalColor } = resultData;

    const base64Image = previewImage.split("base64,")[1];
    const byteCharacters = atob(base64Image);
    const byteArrays = [];

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArrays.push(byteCharacters.charCodeAt(i));
    }

    const blob = new Blob([new Uint8Array(byteArrays)], { type: "image/jpeg" });
    const file = new File([blob], "image.jpg", { type: "image/jpeg" });

    const formData = new FormData();
    formData.append("image", file);
    formData.append("color", personalColor);

    axios
        .post("http://localhost:8080/api/personalColor/save", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        })
        .then((response) => {
          const data = response.data;
          if (data.statusCode === 200) {
            alert("저장 성공!");
            navigate("/mystyle/Personal-Detail");
          } else {
            alert("저장 실패: " + data.responseMessage);
          }
        })
        .catch((error) => {
          console.error("저장 중 오류 발생:", error);
          alert("저장 중 오류가 발생했습니다.");
        });
  };

  if (loading) {
    return <LoadingPage robotImage={robot} />;
  }

  if (!resultData) {
    return <div>결과 데이터를 불러오지 못했습니다. 다시 시도해주세요.</div>;
  }

  return (
      <>
        <div className={styles.bg} />
        <Container className={styles.container}>
          <div className={styles.texts}>
            <div className={styles.heading}>퍼스널 컬러 진단 결과</div>
            <div className={styles.figure}>
              {previewImage ? (
                  <img src={previewImage} alt="선택한 이미지 미리보기"/>
              ) : (
                  <img src={user} alt="기본 이미지"/>
              )}
            </div>
            <p className={styles.description}>
              당신은 <strong>{resultData.personalColor} 톤</strong> 입니다!
              <br/>
              당신에게 어울리는 스타일은 다음과 같아요
            </p>
            <p className={styles.hashtag}>{recommendations1}</p>
            <p className={styles.hashtag}>{recommendations2}</p>
            <p className={styles.hashtag}>{recommendations3}</p>
          </div>

          <div className={styles.stylerecommendation}>
            <img
                src={robot}
                alt="robot"
                className={styles.stylerecommendationIcon}
            />
            <div className={styles.stylerecommendationDetail}>
              <div className={styles.recommendationHeader}>
                STYLEROBO
                <span className={styles.subHeader}>가 추천해주는 코디에요!</span>
              </div>

              <div className={styles.imageGrid}>
                {seasonImages.map((src, index) => (
                    <img key={index} src={src} alt={`추천 스타일 ${index + 1}`} />
                ))}
              </div>
            </div>
          </div>

          <div className={styles.buttons}>
            <button className={styles.saveButton} onClick={handleSave}>
              <img src={save} alt="save" className={styles.buttonIcon} />
              My Style에 저장하기
            </button>
          </div>
        </Container>
      </>
  );
}

export default PersonalResult;
