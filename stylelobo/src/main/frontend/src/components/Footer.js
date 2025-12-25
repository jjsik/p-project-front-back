// Footer.js
import githubIcon from "../assets/github.svg";
import youtubeIcon from "../assets/youtube.svg";
import instagramIcon from "../assets/instagram.svg";
import styles from "./Footer.module.css";
import Container from "./Container";

function Footer() {
  return (
    <div className={styles.footer}>
      <Container>
        <div className={styles.icons}>
          <div className={styles.sns}>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={githubIcon} alt="GitHub 아이콘" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagramIcon} alt="Instagram 아이콘" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={youtubeIcon} alt="YouTube 아이콘" />
            </a>
          </div>
        </div>
        <ul className={styles.links}>
          <li>
            <a href="#">서비스이용약관</a>
          </li>
          <li>
            <a href="#">개인정보처리방침</a>
          </li>
          <li>
            <a href="#">영상정보처리방침</a>
          </li>
        </ul>
        <p>© Gachon University. All rights reserved.</p>
      </Container>
    </div>
  );
}

export default Footer;
