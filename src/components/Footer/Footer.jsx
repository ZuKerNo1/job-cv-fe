import styles from './Footer.module.css';
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_content}>
        <div className={styles.footer_section}>
          <h3>Về JobPortal</h3>
          <p>
            Nền tảng tìm kiếm việc làm hàng đầu, kết nối ứng viên với các cơ hội việc làm tốt nhất.
          </p>
          <div className={styles.social_links}>
            <a href="#">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#">
              <i className="fab fa-linkedin-in" />
            </a>
            <a href="#">
              <i className="fab fa-twitter" />
            </a>
            <a href="#">
              <i className="fab fa-instagram" />
            </a>
          </div>
        </div>
        <div className={styles.footer_section}>
          <h3>Dành cho ứng viên</h3>
          <ul className={styles.footer_links}>
            <li>
              <a href="#">Tìm việc làm</a>
            </li>
            <li>
              <a href="#">Tạo CV online</a>
            </li>
            <li>
              <a href="#">Cẩm nang nghề nghiệp</a>
            </li>
            <li>
              <a href="#">Trắc nghiệm tính cách</a>
            </li>
          </ul>
        </div>
        <div className={styles.footer_section}>
          <h3>Nhà tuyển dụng</h3>
          <ul className={styles.footer_links}>
            <li>
              <a href="#">Đăng tin tuyển dụng</a>
            </li>
            <li>
              <a href="#">Tìm hồ sơ</a>
            </li>
            <li>
              <a href="#">Giải pháp tuyển dụng</a>
            </li>
            <li>
              <a href="#">Báo giá dịch vụ</a>
            </li>
          </ul>
        </div>
        <div className={styles.footer_section}>
          <h3>Liên hệ</h3>
          <ul className={styles.footer_links}>
            <li>
              <i className="fas fa-phone" /> 0123 456 789
            </li>
            <li>
              <i className="fas fa-envelope" /> contact@jobportal.com
            </li>
            <li>
              <i className="fas fa-map-marker-alt" /> Đà Nẵng, Việt Nam
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
