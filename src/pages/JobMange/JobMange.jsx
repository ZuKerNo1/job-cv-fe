import Box from '@mui/material/Box';
import Header from '../../components/Header/Admin/Header';
import { useEffect, useState } from 'react';
import { getListJobAdminAPI } from '../../apis';
import TableJobs from '../../components/TableJobs/TableJobs';
import PageLoadingSpinner from '../../components/Loading/PageLoadingSpinner';

const JobManage = () => {
  const [listJob, setListJob] = useState(null);
  useEffect(() => {
    fetchApiJob();
  }, []);

  const fetchApiJob = async () => {
    const jobs = await getListJobAdminAPI();
    setListJob(jobs.jobs);
  };
  return (
    <Box>
      <Header title={'Danh sách công việc'} />
      {listJob !== null ? (
        <TableJobs title={'Danh sách việc làm mới đăng'} listJob={listJob} onReload={fetchApiJob} />
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
          <PageLoadingSpinner caption={'Loading list job recent...'} />
        </Box>
      )}
    </Box>
  );
};
export default JobManage;
