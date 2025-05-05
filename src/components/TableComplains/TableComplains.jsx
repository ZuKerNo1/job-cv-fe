import styles from '../../styles/Table.module.css';
import ListComplains from './ListComplains/ListComplains';

const TableComplains = ({ title, listComplain, onReload }) => {
  return (
    <div className={styles.data_section}>
      <div className={styles.section_header}>
        <h3 className={styles.section_title}>{title}</h3>
      </div>
      <table className={styles.data_table}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Công ty</th>
            <th>Người đăng</th>
            <th>Ngày đăng</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <ListComplains listComplain={listComplain} onReload={onReload} />
      </table>
    </div>
  );
};
export default TableComplains;
