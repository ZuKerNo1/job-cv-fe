import StatisticItem from '../../../components/StatisticItem/StatisticItem';
import styles from '../../../styles/DashBoard.module.css';
const Statistics = ({ statistics }) => {
  return (
    <div className={styles.stats_grid}>
      <StatisticItem
        icon={'fas fa-users'}
        quantity={statistics.users - 1}
        title={'Tổng người dùng'}
        colorIcon={styles.stat_users}
      />
      <StatisticItem
        icon={'fas fa-briefcase'}
        quantity={statistics.jobs}
        title={'Tổng việc làm'}
        colorIcon={styles.stat_jobs}
      />
      <StatisticItem
        icon={'fas fa-file-alt'}
        quantity={statistics.candidates}
        title={'Đơn ứng tuyển'}
        colorIcon={styles.stat_applications}
      />

      <StatisticItem
        icon={'fas fa-exclamation-circle'}
        quantity={statistics.complains}
        title={'Khiếu nại chờ xử lý'}
        colorIcon={styles.stat_reports}
      />
    </div>
  );
};
export default Statistics;
