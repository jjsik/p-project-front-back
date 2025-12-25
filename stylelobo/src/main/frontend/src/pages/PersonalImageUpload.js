//
// import React, { useState } from "react";
// import Container from "../components/Container";
// import styles from "./PersonalImageUpload.module.css";
// import CameraImg from "../assets/camera.svg";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
//
// function PersonalImageUpload() {
//   const [selectedFile, setSelectedFile] = useState(null); // 선택된 파일 상태
//   const [previewImage, setPreviewImage] = useState(null); // 이미지 미리보기 상태
//   const navigate = useNavigate();
//
//   // 파일 선택 핸들러
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//
//     if (!file) {
//       alert("이미지를 선택해주세요!");
//       return;
//     }
//
//     setSelectedFile(file);
//
//     // 파일 미리보기 처리
//     const reader = new FileReader();
//     reader.onloadend = () => {
//       setPreviewImage(reader.result);
//     };
//     reader.readAsDataURL(file);
//   };
//
//   // 파일 업로드 핸들러
//   const handleUpload = async () => {
//     if (!selectedFile) {
//       alert("사진을 선택해주세요!");
//       return;
//     }
//
//     const formData = new FormData();
//     formData.append("image", selectedFile); // FormData에 파일 추가
//
//     try {
//       const response = await axios.post(
//           "http://localhost:8080/api/personalColor/analysis",
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//             withCredentials: true, // 쿠키를 포함하여 요청
//           }
//       );
//
//       // API 응답 처리
//       if (response.data.statusCode === 200) {
//         alert("분석이 완료되었습니다!");
//         // 결과 페이지로 이동하면서 데이터 전달
//         navigate("/personal-color-consulting/personal-color-result", {
//           state: {
//             previewImage: previewImage,
//             resultData: response.data.data,
//           },
//         });
//       } else {
//         alert("분석 실패: " + response.data.responseMessage);
//       }
//     } catch (error) {
//       console.error("업로드 중 오류 발생:", error);
//       alert("업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
//     }
//   };
//
//   return (
//       <>
//         <Container className={styles.container}>
//           <div className={styles.figure}>
//             {previewImage ? (
//                 <img
//                     src={previewImage}
//                     alt="선택한 이미지 미리보기"
//                     className={styles.previewImage}
//                 />
//             ) : (
//                 <img src={CameraImg} alt="카메라" />
//             )}
//           </div>
//           <div className={styles.fileInput}>
//             <input type="file" onChange={handleFileChange} accept="image/*" />
//           </div>
//         </Container>
//         <div className={styles.button}>
//           <button className={styles.uploadButton} onClick={handleUpload}>
//             ▶ 사진 업로드 및 AI 분석 시작
//           </button>
//         </div>
//       </>
//   );
// }
//
// export default PersonalImageUpload;

import React, { useState } from "react";
import Container from "../components/Container";
import styles from "./PersonalImageUpload.module.css";
import CameraImg from "../assets/camera.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingPage from "../components/Loading";
import Robot from "../assets/robot2.png";

function PersonalImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null); // 선택된 파일 상태
  const [previewImage, setPreviewImage] = useState(null); // 이미지 미리보기 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const navigate = useNavigate();

  // 파일 선택 핸들러
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      alert("이미지를 선택해주세요!");
      return;
    }

    setSelectedFile(file);

    // 파일 미리보기 처리
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // 파일 업로드 핸들러
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("사진을 선택해주세요!");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile); // FormData에 파일 추가

    try {
      setLoading(true); // 로딩 시작
      const response = await axios.post(
          "http://localhost:8080/api/personalColor/analysis",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true, // 쿠키를 포함하여 요청
          }
      );

      // API 응답 처리
      if (response.data.statusCode === 200) {
        alert("분석이 완료되었습니다!");
        setLoading(false); // 로딩 종료
        // 결과 페이지로 이동하면서 데이터 전달
        navigate("/personal-color-consulting/personal-color-result", {
          state: {
            previewImage: previewImage,
            resultData: response.data.data,
          },
        });
      } else {
        alert("분석 실패: " + response.data.responseMessage);
        setLoading(false); // 로딩 종료
      }
    } catch (error) {
      console.error("업로드 중 오류 발생:", error);
      alert("업로드 중 오류가 발생했습니다. 다시 시도해주세요.");
      setLoading(false); // 로딩 종료
    }
  };

  if (loading) return <LoadingPage robotImage={Robot} />;

  return (
      <>
        <Container className={styles.container}>
          <div className={styles.figure}>
            {previewImage ? (
                <img
                    src={previewImage}
                    alt="선택한 이미지 미리보기"
                    className={styles.previewImage}
                />
            ) : (
                <img src={CameraImg} alt="카메라" />
            )}
          </div>
          <div className={styles.fileInput}>
            <input
                type="file"
                id="fileInput"
                onChange={handleFileChange}
                accept="image/*"
            />
          </div>
        </Container>
        <div className={styles.button}>
          <button className={styles.uploadButton} onClick={handleUpload}>
            ▶ 사진 업로드 및 AI 분석 시작
          </button>
        </div>
      </>
  );
}

export default PersonalImageUpload;
