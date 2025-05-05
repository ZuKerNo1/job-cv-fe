import styles from '../../../styles/Table.module.css';
import ListInterviewer from './ListInterview/ListInterview';
const TableInterviewer = ({ title, listInterview, onReload }) => {
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
            <th>Email</th>
            <th>Link CV</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <ListInterviewer listInterview={listInterview} onReload={onReload} />
      </table>
    </div>
  );
};
export default TableInterviewer;
