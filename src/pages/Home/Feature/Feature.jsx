import styles from './Feature.module.css';
const Feature = () => {
  return (
    <section className={styles.features}>
      <h2 className={styles.section_title}>Tính năng nổi bật</h2>
      <div className={styles.features_grid}>
        <div className={styles.feature_card}>
          <div className={styles.feature_icon}>
            <i className="fas fa-search" />
          </div>
          <h3>Tìm kiếm thông minh</h3>
          <p>Dễ dàng tìm kiếm công việc phù hợp với kỹ năng của bạn</p>
        </div>
        <div className={styles.feature_card}>
          <div className={styles.feature_icon}>
            <i className="fas fa-user-tie" />
          </div>
          <h3>Hồ sơ chuyên nghiệp</h3>
          <p>Tạo hồ sơ ấn tượng để thu hút nhà tuyển dụng</p>
        </div>
        <div className={styles.feature_card}>
          <div className={styles.feature_icon}>
            <i className="fas fa-video" />
          </div>
          <h3>Phỏng vấn trực tuyến</h3>
          <p>Tham gia phỏng vấn trực tuyến mọi lúc, mọi nơi</p>
        </div>
      </div>
    </section>
  );
};
export default Feature;
