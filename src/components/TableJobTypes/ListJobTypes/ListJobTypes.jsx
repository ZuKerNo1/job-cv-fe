import styles from '../../../styles/Table.module.css';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from 'material-ui-confirm';
import { deleteJobType } from '../../../apis';
import { toast } from 'react-toastify';

const ListJobTypes = ({ listJobTypes, onReload }) => {
  const navigate = useNavigate();
  const confirmDelete = useConfirm();

  const handleEdit = (id) => {
    navigate(`/admin/job-types/edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const { confirmed } = await confirmDelete({
        description: 'Hành động này sẽ xóa loại công việc này vĩnh viễn!',
        title: 'Xóa loại công việc?',
        confirmationText: 'Xác nhận',
        cancellationText: 'Hủy',
        buttonOrder: ['confirm', 'cancel']
      });

      if (confirmed) {
        await deleteJobType(id);
        onReload();
        toast.success('Xóa thành công!');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi xóa loại công việc');
    }
  };

  return (
    <tbody>
      {listJobTypes.map((jobType, index) => (
        <tr key={jobType._id}>
          <td>{index + 1}</td>
          <td>{jobType.name}</td>
          <td>{jobType.description}</td>
          <td>
            <div className={styles.table_actions}>
              <button
                className={styles.btn_action + ' ' + styles.btn_primary}
                onClick={() => handleEdit(jobType._id)}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                className={styles.btn_action + ' ' + styles.btn_danger}
                onClick={() => handleDelete(jobType._id)}
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default ListJobTypes;
