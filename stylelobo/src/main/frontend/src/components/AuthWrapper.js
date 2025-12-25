import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AuthWrapper({ setUser, children }) {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // 초기 상태를 null로 설정
  const [retryCount, setRetryCount] = useState(0); // 재시도 횟수 상태 추가
  const MAX_RETRIES = 5; // 최대 재시도 횟수 설정
  const RETRY_DELAY = 1000; // 재시도 지연 시간(ms)

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user/isLogin", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 쿠키 포함
        });

        if (response.status === 204) {
          // 로그인 상태가 아닐 때
        }

        if (response.ok) {
          const data = await response.json();
          if (data.statusCode === 200 && data.data.login) {
            setIsAuthenticated(true);
            setUser({ nickName: data.data.nickName, gender: data.data.gender }); // 유저 정보 설정
          } else {
            alert("로그인이 필요합니다.");
            setIsAuthenticated(false);
            setUser(null); // 유저 정보 초기화
            navigate("/auth/login");
          }
        } else {
          console.error("로그인 상태 확인 실패:", response.status);
          setIsAuthenticated(false);
          setUser(null); // 유저 정보 초기화
          navigate("/auth/login");
        }
      } catch (error) {
        console.error("로그인 상태 확인 중 오류:", error);
        setIsAuthenticated(false);
        setUser(null); // 유저 정보 초기화
        navigate("/auth/login");
      }
    };

    checkLogin(); // 로그인 상태 확인 함수 호출
  }, [navigate, retryCount, setUser]);

  if (isAuthenticated === null) {
    return <p>로그인 정보를 확인 중입니다...</p>;
  }

  return children; // 유저 정보가 있으면 자식 컴포넌트를 렌더링
}

export default AuthWrapper;
