import styles from '../../../styles/Table.module.css';
import ListJobs from './ListJobs/ListJobs';
const TableJob = ({ title, listJob, onReload }) => {
  return (
    <div className={styles.data_section}>
      <div className={styles.section_header}>
        <h3 className={styles.section_title}>{title}</h3>
      </div>
      <table className={styles.data_table}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Vị trí</th>
            <th>Địa điểm</th>
            <th>Ngày đăng</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <ListJobs listJob={listJob} onReload={onReload} />
      </table>
    </div>
  );
};
export default TableJob;
