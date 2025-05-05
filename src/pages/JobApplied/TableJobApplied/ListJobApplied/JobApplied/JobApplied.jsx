import { statusName } from '../../../../../utils/formatters';
import styles from '../../../../../styles/Table.module.css';
import { Link } from 'react-router-dom';
const JobApplied = ({ order, jobApplied }) => {
  return (
    <tr>
      <td>{order}</td>
      <td>{jobApplied.position}</td>
      <td>{jobApplied.creatorInfo.companyName}</td>
      <td>{jobApplied.jobInfo.salary}$</td>
      <td>
        {
          <Link to={jobApplied?.cvLink} target="_blank">
            {jobApplied?.cvLink ? 'CV link' : ''}
          </Link>
        }
      </td>
      <td>
        <span className={styles.status + ' ' + styles[`status_${jobApplied.status}`]}>
          {statusName(jobApplied.status)}
        </span>
      </td>
    </tr>
  );
};
export default JobApplied;
