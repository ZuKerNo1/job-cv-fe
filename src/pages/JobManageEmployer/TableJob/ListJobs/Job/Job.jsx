import { Link } from 'react-router-dom';
import styles from '../../../../../styles/Table.module.css';
import { convertDateTime, statusName } from '../../../../../utils/formatters';
import { useConfirm } from 'material-ui-confirm';
import { deleteJob } from '../../../../../apis';
import { toast } from 'react-toastify';
const Job = ({ job, order, onReload }) => {
  const confirmDeleteJob = useConfirm();
  const handleDeleteJob = async () => {
    const { confirmed } = await confirmDeleteJob({
      description: 'Hành động này sẽ xóa Công việc vĩnh viên !',
      title: 'Xóa công việc ?',
      confirmationText: 'Confirm',
      cancellationText: 'Cancel',
      buttonOrder: ['confirm', 'cancel']
    });
    if (confirmed) {
      await deleteJob(job._id);
      await onReload();
      toast.success('Xóa thành công !');
    }
  };
  return (
    <tr>
      <td>{order}</td>
      <td>{job.position}</td>
      <td>{job.jobLocation}</td>
      <td>{convertDateTime(job.createdAt)}</td>

      <td>
        <span className={styles.status + ' ' + styles[`status_${job.status}`]}>
          {statusName(job.status)}
        </span>
      </td>
      <td>
        <div className={styles.table_actions}>
          <Link to={`/employer/jobs/${job._id}`}>
            <button className={styles.btn_action + ' ' + styles.btn_view}>
              <i className="fas fa-eye" />
            </button>
          </Link>
          <Link to={`/employer/jobs/edit/${job._id}`}>
            <button className={styles.btn_action + ' ' + styles.btn_edit}>
              <i className="fas fa-edit" />
            </button>
          </Link>
          <button className={styles.btn_action + ' ' + styles.btn_delete} onClick={handleDeleteJob}>
            <i className="fas fa-trash" />
          </button>
        </div>
      </td>
    </tr>
  );
};
export default Job;
