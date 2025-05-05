import { Link } from 'react-router-dom';
import styles from '../../styles/Table.module.css';
import ListUser from './ListUser/ListUser';
const TableUser = ({ title, listUser, onReload }) => {
  return (
    <div className={styles.data_section}>
      <div className={styles.section_header}>
        <h3 className={styles.section_title}>{title}</h3>
        <Link to="/admin/users/create">
          <button className={styles.action_button + ' ' + styles.btn_primary}>
            <i className="fas fa-plus" /> Thêm người dùng
          </button>
        </Link>
      </div>
      <table className={styles.data_table}>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <ListUser listUser={listUser} onReload={onReload} />
      </table>
    </div>
  );
};
export default TableUser;
