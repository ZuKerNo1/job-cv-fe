import dayjs from 'dayjs';
import styles from '../../../../styles/Table.module.css';
import { statusName } from '../../../../utils/formatters';

import { Link } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import { deleteContractAPI } from '../../../../apis';
import { toast } from 'react-toastify';
const Contract = ({ contract, order, onReload }) => {
  const confirmDeleteContract = useConfirm();
  const handleDeleteContract = async () => {
    const { confirmed } = await confirmDeleteContract({
      description: 'Hành động này sẽ xóa vĩnh viên !',
      title: 'Xóa công việc ?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel',
      buttonOrder: ['confirm', 'cancel']
    });
    if (confirmed) {
      await deleteContractAPI(contract._id);
      await onReload();
      toast.success('Xóa thành công !');
    }
  };
  return (
    <tr>
      <td>{order}</td>
      <td>Tech Company</td>
      <td>{dayjs(contract.createdAt).format('MMM DD YYYY HH:mm')}</td>
      <td>
        <span className={styles.status + ' ' + styles[`status_${contract.status}`]}>
          {statusName(contract.status)}
        </span>
      </td>
      <td>
        <div className={styles.table_actions}>
          <Link to={`/admin/contracts/edit/${contract._id}`}>
            <button className={styles.btn_action + ' ' + styles.btn_edit}>
              <i className="fas fa-edit" />
            </button>
          </Link>
          <button
            className={styles.btn_action + ' ' + styles.btn_delete}
            onClick={handleDeleteContract}
          >
            <i className="fas fa-trash" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default Contract;
