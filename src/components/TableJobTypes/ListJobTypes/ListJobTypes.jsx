import styles from '../../../styles/Table.module.css';

const ListJobTypes = ({ listJobTypes, onReload }) => {
  return (
    <tbody>
      {listJobTypes.map((jobType, index) => (
        <tr key={jobType._id}>
          <td>{index + 1}</td>
          <td>{jobType.name}</td>
          <td>{jobType.description}</td>
          <td>{jobType.jobCount || 0}</td>
          <td>
            <div className={styles.table_actions}>
              <button
                className={styles.btn_action + ' ' + styles.btn_primary}
                onClick={() => {
                  /* Handle edit */
                }}
              >
                <i className="fas fa-edit"></i>
              </button>
              <button
                className={styles.btn_action + ' ' + styles.btn_danger}
                onClick={() => {
                  /* Handle delete */
                }}
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
