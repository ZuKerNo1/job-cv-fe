import styles from '../../styles/DashBoard.module.css';
const StatisticItem = ({ quantity, icon, title, colorIcon }) => {
  return (
    <div className={styles.stat_card}>
      <div className={styles.stat_icon + ' ' + colorIcon}>
        <i className={icon} />
      </div>
      <div className={styles.stat_value}>{quantity}</div>
      <div className={styles.stat_label}>{title}</div>
    </div>
  );
};
export default StatisticItem;
