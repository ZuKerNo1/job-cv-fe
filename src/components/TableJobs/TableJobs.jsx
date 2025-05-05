import styles from '../../styles/Table.module.css';
import ListJob from './ListJob/ListJob';

const TableJobs = ({ title, listJob, onReload }) => {
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
            <th>Công ty</th>
            <th>Ngày đăng</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <ListJob listJob={listJob} onReload={onReload} />
      </table>
    </div>
  );
};
export default TableJobs;
