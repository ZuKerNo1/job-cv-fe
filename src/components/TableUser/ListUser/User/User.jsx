import { useConfirm } from 'material-ui-confirm';
import styles from '../../../../styles/Table.module.css';
import { ROLE_USER } from '../../../../utils/constants';
import { capitalizeFirstLetter, roleName, statusName } from '../../../../utils/formatters';
import { deleteUserAdminAPI } from '../../../../apis';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
const User = ({ user, order, onReload }) => {
  const confirmDeleteColumn = useConfirm();
  const handleDeleteUser = async () => {
    const { confirmed } = await confirmDeleteColumn({
      description: 'Hành đồng này sẽ xóa tài khoản vĩnh viễn !',
      title: 'Xóa tài khoản ?',
      confirmationText: 'Xác nhận',
      cancellationText: 'Hủy bỏ',
      buttonOrder: ['confirm', 'cancel']
    });
    if (confirmed) {
      await deleteUserAdminAPI(user._id);
      await onReload();
      toast.success('Xóa thành công !');
    }
  };
  return (
    user.role !== ROLE_USER.ADMIN && (
      <tr>
        <td>{order}</td>
        <td>{capitalizeFirstLetter(user.username)}</td>
        <td>{user.email}</td>
        <td>{roleName(user.role)}</td>
        <td>
          <span className={styles.status + ' ' + styles[`status_${user.status}`]}>
            {statusName(user.status)}
          </span>
        </td>
        <td>
          <div className={styles.table_actions}>
            <Link to={`/admin/users/${user._id}`}>
              <button className={styles.btn_action + ' ' + styles.btn_view}>
                <i className="fas fa-eye" />
              </button>
            </Link>
            <Link to={`/admin/users/edit/${user._id}`}>
              <button className={styles.btn_action + ' ' + styles.btn_edit}>
                <i className="fas fa-edit" />
              </button>
            </Link>
            <button
              className={styles.btn_action + ' ' + styles.btn_delete}
              onClick={handleDeleteUser}
            >
              <i className="fas fa-trash" />
            </button>
          </div>
        </td>
      </tr>
    )
  );
};
export default User;
