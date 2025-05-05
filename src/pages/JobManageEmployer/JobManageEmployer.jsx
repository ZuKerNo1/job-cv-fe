import { Box } from '@mui/material';
import Header from '../../components/Header/Admin/Header';
import { useEffect, useState } from 'react';
import { getListJobEmployerAPI } from '../../apis';
import TableJob from './TableJob/TableJob';
import PageLoadingSpinner from '../../components/Loading/PageLoadingSpinner';

const JobManageEmployer = () => {
  const [listJob, setListJob] = useState(null);
  useEffect(() => {
    fetchApiJob();
  }, []);
  const fetchApiJob = async () => {
    const data = await getListJobEmployerAPI();
    setListJob(data.jobs);
  };
  return (
    <Box>
      <Header title={'Danh sách công việc'} />
      {listJob !== null ? (
        <TableJob title={'Công việc'} listJob={listJob} onReload={fetchApiJob} />
      ) : (
        <Box
          sx={{
            width: 'calc(100vw - 250px)',
            display: 'flex',
            alignItems: 'center',
            padding: '36px 0',
            flexWrap: 'nowrap',
            gap: 2,
            justifyContent: 'center'
          }}
        >
          <PageLoadingSpinner caption={'Loading list...'} />
        </Box>
      )}
    </Box>
  );
};
export default JobManageEmployer;
