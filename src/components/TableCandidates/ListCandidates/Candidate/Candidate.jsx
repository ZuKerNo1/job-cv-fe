import { capitalizeFirstLetter, convertDateTime, statusName } from '../../../../utils/formatters';
import styles from '../../../../styles/Table.module.css';
import { changeStatusCandiateAPI } from '../../../../apis/index.js';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { STATUS } from '../../../../utils/constants.js';
const Candidate = ({ candidate, order, onReload }) => {
  const handleChangeStatus = async (status) => {
    const loadingToast = toast.loading('Loading...');
    await changeStatusCandiateAPI(status, candidate.id, candidate.indoUser.email);
    await onReload();
    toast.update(loadingToast, {
      render: 'Đã gửi thông báo cho ứng viên qua email !',
      type: 'success',
      isLoading: false,
      autoClose: 2000
    });
  };
  return (
    <tr>
      <td>{order}</td>
      <td>{candidate.indoUser.email}</td>
      <td>{capitalizeFirstLetter(candidate?.position)}</td>
      <td>{convertDateTime(candidate?.createdAt)}</td>
      <td>
        <span className={styles.status + ' ' + styles[`status_${candidate?.status}`]}>
          {statusName(candidate?.status)}
        </span>
      </td>
      <td>
        <div className={styles.table_actions}>
          <Link to={`/employer/candidates/details/${candidate.id}`}>
            <button className={styles.btn_action + ' ' + styles.btn_view}>
              <i className="fas fa-eye" /> xem
            </button>
          </Link>
          <button
            className={styles.btn_action + ' ' + styles.btn_edit}
            onClick={() => {
              handleChangeStatus(STATUS.ACCEPT);
            }}
          >
            <i className="fas fa-edit" /> chấp nhận
          </button>
          <button
            className={styles.btn_action + ' ' + styles.btn_delete}
            onClick={() => {
              handleChangeStatus(STATUS.REJECT);
            }}
          >
            <i className="fa-solid fa-xmark"></i> từ chối
          </button>
        </div>
      </td>
    </tr>
  );
};
export default Candidate;
