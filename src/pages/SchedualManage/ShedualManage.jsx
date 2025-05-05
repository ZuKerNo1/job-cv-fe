import { Box } from '@mui/material';
import Header from '../../components/Header/Admin/Header';
import styles from '../../styles/Table.module.css';
import { useEffect, useState } from 'react';
import { getListSchedualAPI } from '../../apis';
import { convertDateTime } from '../../utils/formatters';
const SchedualManage = () => {
  const [listSchedual, setListSchedual] = useState(null);
  useEffect(() => {
    getListSchedualAPI().then((data) => {
      setListSchedual(data);
    });
  }, []);
  return (
    <Box>
      <Header title={'Danh sách lịch phỏng vấn'} />
      <Box>
        {listSchedual && (
          <div className={styles.data_section}>
            <div className={styles.section_header}>
              <h3 className={styles.section_title}>{'Lịch phỏng vấn'}</h3>
            </div>
            <table className={styles.data_table}>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Email</th>
                  <th>Lịch ứng tuyển</th>
                </tr>
              </thead>
              <tbody>
                {listSchedual.map((schedual, index) => (
                  <tr key={schedual._id}>
                    <td>{index + 1}</td>
                    <td>{schedual.jobSeekerInfo.email}</td>
                    <td>{convertDateTime(schedual.schedual)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Box>
    </Box>
  );
};
export default SchedualManage;
