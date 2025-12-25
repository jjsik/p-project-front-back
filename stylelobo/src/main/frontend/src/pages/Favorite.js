import Container from "../components/Container";
import styles from "./Favorite.module.css";
import robot from "../assets/robot.png";
import Button from "../components/Button.js";
import { useNavigate } from "react-router-dom";

function Favorite() {
  const navigate = useNavigate();
  const navFavDiag = () => {
    navigate("/consulting/favorite/diagnosis");
  };
  return (
    <>
      <div className={styles.bg} />
      <Container className={styles.container}>
        <div className={styles.textimagecontainer}>
          <div className={styles.texts}>
            <div className={styles.heading}>
              <strong> Favorite Fashion</strong>
            </div>
            <p className={styles.description}>
              <strong>나의 취향을 보여주고 스타일을 추천받아보세요!</strong>
              <br />
            </p>
            <Button className={styles.button} onClick={navFavDiag}>
              ▶ 진단하러 가기
            </Button>
          </div>

          <div className={styles.figure}>
            <img src={robot} alt="로봇" />
          </div>
        </div>
      </Container>
    </>
  );
}

export default Favorite;
