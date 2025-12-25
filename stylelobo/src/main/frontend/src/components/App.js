import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Favorite from "../pages/Favorite";
import PersonalColorMain from "../pages/PersonalColorMain";
import FavDiagnosis from "../pages/FavDiagnosis";
import FavResult from "../pages/FavResult";
import PersonalColorCheck from "../pages/PersonalColorCheck";
import PersonalImageUpload from "../pages/PersonalImageUpload";
import PersonalColorConsulting from "../pages/PersonalColorConsulting";
import PersonalResult from "../pages/PersonalResult";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import MyStyle from "../pages/MyStyle";
import MyStylePersonalDetail from "../pages/MyStylePersonalDetail";
import MyStyleFavDetail from "../pages/MyStyleFavDetail";
import Nav from "./Nav";
import Footer from "./Footer";
import styles from "./App.module.css";
import "./App.font.css";
import AuthWrapper from "./AuthWrapper";

function App() {
  const [user, setUser] = useState(null); // 로그인된 사용자 정보

  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/user/logout", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 쿠키 포함
      });

      if (response.ok) {
        setUser(null);
      } else {
        alert("로그아웃 실패");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <Router>
      <Nav
        userName={user?.nickName}
        userGender={user?.gender}
        onLogout={handleLogout}
      />
      <div className={styles.body}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/auth/login"
            element={<Login onLoginSuccess={() => setUser(user)} />}
          />
          <Route path="/auth/signup" element={<Signup />} />
          <Route
            path="/consulting/favorite"
            element={
              <AuthWrapper setUser={setUser}>
                <Favorite />
              </AuthWrapper>
            }
          />
          <Route
            path="/consulting/personal-color-main"
            element={
              <AuthWrapper setUser={setUser}>
                <PersonalColorMain />
              </AuthWrapper>
            }
          />
          <Route
            path="/consulting/favorite/diagnosis"
            element={
              <AuthWrapper setUser={setUser}>
                <FavDiagnosis />
              </AuthWrapper>
            }
          />
          <Route
            path="/consulting/favorite/result"
            element={
              <AuthWrapper setUser={setUser}>
                <FavResult />
              </AuthWrapper>
            }
          />
          <Route
            path="/personal-color-check"
            element={
              <AuthWrapper setUser={setUser}>
                <PersonalColorCheck />
              </AuthWrapper>
            }
          />
          <Route
            path="/personal-image-upload"
            element={
              <AuthWrapper setUser={setUser}>
                <PersonalImageUpload />
              </AuthWrapper>
            }
          />
          <Route
            path="/personal-color-consulting"
            element={
              <AuthWrapper setUser={setUser}>
                <PersonalColorConsulting />
              </AuthWrapper>
            }
          />
          <Route
            path="/personal-color-consulting/personal-color-result"
            element={
              <AuthWrapper setUser={setUser}>
                <PersonalResult />
              </AuthWrapper>
            }
          />
          <Route
            path="/mystyle"
            element={
              <AuthWrapper setUser={setUser}>
                <MyStyle />
              </AuthWrapper>
            }
          />
          <Route
            path="/mystyle/Personal-Detail"
            element={
              <AuthWrapper setUser={setUser}>
                <MyStylePersonalDetail />
              </AuthWrapper>
            }
          />
          <Route
            path="/mystyle/Fav-Detail"
            element={
              <AuthWrapper setUser={setUser}>
                <MyStyleFavDetail />
              </AuthWrapper>
            }
          />
        </Routes>
      </div>
      <Footer className={styles.footer} />
    </Router>
  );
}

export default App;
