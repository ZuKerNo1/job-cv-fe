import { Box } from '@mui/material';
import styles from '../../../styles/Table.module.css';
import ListJobApplied from './ListJobApplied/ListJobApplied';
const TableJobApplied = ({ title, listJobApplied }) => {
  return (
    <Box
      sx={{
        mt: '90px'
      }}
    >
      <div className={styles.data_section}>
        <div className={styles.section_header}>
          <h3 className={styles.section_title}>{title}</h3>
        </div>
        <table className={styles.data_table}>
          <thead>
            <tr>
              <th>STT</th>
              <th>Vị trí</th>
              <th>Công ty</th>
              <th>Mức lương</th>
              <th>Link CV</th>
              <th>Trạng thái</th>
            </tr>
          </thead>
          <ListJobApplied listJobApplied={listJobApplied} />
        </table>
      </div>
    </Box>
  );
};
export default TableJobApplied;
