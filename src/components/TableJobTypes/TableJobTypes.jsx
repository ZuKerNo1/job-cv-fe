import { Link } from 'react-router-dom';
import styles from '../../styles/Table.module.css';
import ListJobTypes from './ListJobTypes/ListJobTypes';

const TableJobTypes = ({ title, listJobTypes, onReload }) => {
  return (
    <div className={styles.data_section}>
      <div className={styles.section_header}>
        <h3 className={styles.section_title}>{title}</h3>
        <Link to="/admin/job-types/create">
          <button className={styles.action_button + ' ' + styles.btn_primary}>
            <i className="fas fa-plus" /> Thêm loại công việc
          </button>
        </Link>
      </div>
      <table className={styles.data_table}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên loại</th>
            <th>Mô tả</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <ListJobTypes listJobTypes={listJobTypes} onReload={onReload} />
      </table>
    </div>
  );
};

export default TableJobTypes;
