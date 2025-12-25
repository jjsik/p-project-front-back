import { useState } from "react";
import Container from "../components/Container";
import styles from "./Signup.module.css";
import Button from "../components/Button.js";
import { useNavigate } from "react-router-dom";
import robot from "../assets/robot3.png";

function Signup() {
  const navigate = useNavigate();

  // 상태 관리
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [gender, setGender] = useState("");
  const [userNameCheckResult, setUserNameCheckResult] = useState(null);
  const [nickNameCheckResult, setNickNameCheckResult] = useState(null);

  const navHome = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("회원가입 요청이 발생했습니다."); // 디버깅용 로그

    // 비밀번호 확인 로직
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // API 요청을 위한 데이터 구성
    const requestData = {
      userName,
      password,
      name,
      nickName,
      gender,
    };

    try {
      const response = await fetch("http://localhost:8080/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      // 응답 구조에 맞게 수정
      if (data.statusCode === 200 && data.data.status === 1) {
        alert(data.data.message); // 성공 메시지
        navHome(); // 홈으로 이동
      } else {
        alert("회원가입 실패: " + data.data.message); // 에러 메시지
      }
    } catch (error) {
      console.error("Error:", error);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  const checkUserName = async () => {
    if (!userName) {
      alert("아이디를 입력하세요.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/user/DuplicateTest",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userName }),
        }
      );

      const data = await response.json();

      // statusCode와 data.status를 모두 확인
      if (data.statusCode === 200 && data.data.status === 0) {
        alert("이미 존재하는 아이디입니다."); // 아이디가 존재하는 경우
      } else {
        alert("사용 가능한 아이디입니다."); // 아이디가 존재하지 않는 경우
      }
    } catch (error) {
      console.error("Error:", error);
      alert("중복 확인 중 오류가 발생했습니다.");
    }
  };
  const checkNickName = async () => {
    if (!nickName) {
      alert("닉네임을 입력하세요.");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/user/check-nickname?nickname=${nickName}`,
        {
          method: "GET",
        }
      );

      // 상태 코드 확인
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      // 응답 구조에 맞게 수정
      if (data.statusCode === 200 && data.data.status === 0) {
        alert("이미 존재하는 닉네임입니다."); // 닉네임이 존재하는 경우
      } else {
        alert("사용 가능한 닉네임입니다."); // 닉네임이 존재하지 않는 경우
      }
    } catch (error) {
      console.error("Error:", error);
      alert("중복 확인 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <div className={styles.bg} />
      <Container className={styles.container}>
        <div className={styles.texts}>
          <Container className={styles.welcomecontainer}>
            <strong>
              반갑습니다! 당신의 패션 스타일을 찾아주는 스타일 로보입니다.
            </strong>
            <div className={styles.figure}>
              <img src={robot} alt="로봇 이미지" />
            </div>
            <div className={styles.heading}>STYLEROBO</div>
          </Container>
          <Container className={styles.logincontainer}>
            <div className={styles.heading2}>스타일로보 회원가입</div>
            <form className={styles.formGroup} onSubmit={handleSubmit}>
              <label className={styles.text3} htmlFor="id">
                아이디
              </label>
              <div className={styles.inlineGroup}>
                <input
                  type="text"
                  id="id"
                  placeholder="아이디"
                  className={styles.inputcontainer_id}
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <Button
                  className={styles.button2}
                  type="button"
                  onClick={checkUserName}
                >
                  중복 확인
                </Button>
              </div>
              <label className={styles.text3} htmlFor="pw">
                비밀번호
              </label>
              <input
                type="password"
                id="pw"
                placeholder="비밀번호 입력"
                className={styles.inputcontainer}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                id="pwConfirm"
                placeholder="비밀번호 입력 확인"
                className={styles.inputcontainer}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label className={styles.text3} htmlFor="name">
                이름
              </label>
              <input
                type="text"
                id="name"
                placeholder="이름 입력"
                className={styles.inputcontainer}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className={styles.text3} htmlFor="nickname">
                닉네임
              </label>
              <div className={styles.inlineGroup}>
                <input
                  type="text"
                  id="nickname"
                  placeholder="닉네임 입력"
                  className={styles.inputcontainer_id}
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
                />
                <Button
                  className={styles.button2}
                  type="button"
                  onClick={checkNickName}
                >
                  중복 확인
                </Button>
              </div>
              <label className={styles.text3} htmlFor="gender">
                성별
              </label>
              <div className={styles.text3}>
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="radio"
                      name="gender"
                      value="남성"
                      className={styles.checkbox}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    남성
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="radio"
                      name="gender"
                      value="여성"
                      className={styles.checkbox}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    여성
                  </label>
                </div>
              </div>
              <Button className={styles.button1} type="submit">
                회원가입하기
              </Button>
            </form>
          </Container>
        </div>
      </Container>
    </>
  );
}

export default Signup;
