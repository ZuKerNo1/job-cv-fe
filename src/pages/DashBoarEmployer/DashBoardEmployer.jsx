import Box from '@mui/material/Box';
import Header from '../../components/Header/Admin/Header';
import { useEffect, useState } from 'react';
import { getListJobEmployerAPI, statisticByEmployerAPI } from '../../apis';
import Statistics from './Statistics/Statistics';
import TableJob from '../JobManageEmployer/TableJob/TableJob';
import PageLoadingSpinner from '../../components/Loading/PageLoadingSpinner';
const DashBoardEmployer = () => {
  const [statistics, setStatistics] = useState(null);
  const [listJob, setListJob] = useState(null);
  useEffect(() => {
    statisticByEmployerAPI().then((data) => {
      setStatistics(data);
    });
    fetchApiJob();
  }, []);
  const fetchApiJob = async () => {
    const data = await getListJobEmployerAPI(5);
    setListJob(data.jobs);
  };
  return (
    <Box>
      <Header title={'DashBoard'} />
      {statistics !== null && <Statistics statistics={statistics} />}
      {listJob !== null ? (
        <TableJob title={'Công việc mới tạo'} listJob={listJob} onReload={fetchApiJob} />
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
export default DashBoardEmployer;
