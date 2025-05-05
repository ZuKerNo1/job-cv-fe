import FormSearchJob from '../../../components/FormSearchJob/FormSearchJon';
import styles from './BannerHero.module.css';

const BannerHero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.search_box}>
        <h1>Tìm kiếm công việc mơ ước của bạn</h1>
        <p>Khám phá hàng nghìn cơ hội việc làm từ các công ty hàng đầu</p>
        <FormSearchJob />
      </div>
    </section>
  );
};
export default BannerHero;
