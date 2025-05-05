import styles from '../../styles/Table.module.css';
import ListCandidates from './ListCandidates/ListCandidates';

const TableCandidates = ({ title, listCandidates, onReload, FormSearch }) => {
  return (
    <div className={styles.data_section}>
      <div className={styles.section_header}>
        <h3 className={styles.section_title}>{title}</h3>
      </div>
      {<FormSearch onReload={onReload} /> || ''}
      <table className={styles.data_table}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Ứng viên</th>
            <th>Vị trí</th>
            <th>Ngày nộp</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <ListCandidates listCandidates={listCandidates} onReload={onReload} />
      </table>
    </div>
  );
};
export default TableCandidates;
