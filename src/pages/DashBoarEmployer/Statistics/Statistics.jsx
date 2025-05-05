import StatisticItem from '../../../components/StatisticItem/StatisticItem';
import styles from '../../../styles/DashBoard.module.css';
const Statistics = ({ statistics }) => {
  return (
    <div className={styles.stats_grid}>
      <StatisticItem
        icon={'fas fa-users'}
        quantity={statistics.totalJob}
        title={'Tin đã đăng'}
        colorIcon={styles.stat_users}
      />
      <StatisticItem
        icon={'fas fa-briefcase'}
        quantity={statistics.totalJobAccept}
        title={'Tin đang tuyển'}
        colorIcon={styles.stat_jobs}
      />
      <StatisticItem
        icon={'fas fa-file-alt'}
        quantity={statistics.totalCandidate}
        title={'Đơn ứng tuyển'}
        colorIcon={styles.stat_applications}
      />

      <StatisticItem
        icon={'fas fa-calendar-check'}
        quantity={statistics.totalInterview}
        title={'Phỏng vấn đã lên lịch'}
        colorIcon={styles.stat_reports}
      />
    </div>
  );
};
export default Statistics;
