import { toast } from 'react-toastify';
import { createRoomChatAPI } from '../../../../../apis';
import styles from '../../../../../styles/Table.module.css';
import { Link } from 'react-router-dom';

import CreateSchedual from './CreateSchedual';
import ReviewCandidate from './ReviewCandidate';
const Interviewer = ({ order, interviewer, onReload }) => {
  const handleCreateChatRoom = async () => {
    toast
      .promise(
        createRoomChatAPI({
          jobSeekerId: interviewer.jobSeekerId
        }),
        {
          pending: 'laoding...',
          success: 'Tạo phòng thành công !'
        }
      )
      .then(() => {
        onReload();
      });
  };

  return (
    <tr>
      <td>{order}</td>
      <td>{interviewer.position}</td>
      <td>{interviewer.userInfo.email}</td>
      <td>
        {interviewer?.cvLink && (
          <Link to={interviewer.cvLink} target="_blank">
            cv
          </Link>
        )}
      </td>

      <td>
        <div className={styles.table_actions}>
          <Link to={`/interviewer/list-candidates/details/${interviewer._id}`}>
            <button className={styles.btn_action + ' ' + styles.btn_view}>
              <i className="fas fa-eye" /> xem chi tiết
            </button>
          </Link>
          <CreateSchedual interviewer={interviewer} />
          <ReviewCandidate interviewer={interviewer} />
          {interviewer?.roomChatInfo ? (
            <Link to={`/chat/${interviewer.roomChatInfo._id}`} target="_blank">
              <button className={styles.btn_action + ' ' + styles.btn_edit}>
                <i className="fa-solid fa-comments" /> chat với ứng viên
              </button>
            </Link>
          ) : (
            <button
              className={styles.btn_action + ' ' + styles.btn_edit}
              onClick={handleCreateChatRoom}
            >
              <i className="fa-solid fa-plus"></i> tạo phòng chat
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};
export default Interviewer;
