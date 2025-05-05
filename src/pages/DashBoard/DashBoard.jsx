import Box from '@mui/material/Box';
import Header from '../../components/Header/Admin/Header';
import TableUser from '../../components/TableUser/TableUser';
import TableJobs from '../../components/TableJobs/TableJobs';
import { useEffect, useState } from 'react';
import { getListJobAdminAPI, getListUserAdminAPI, statisticsAPI } from '../../apis';
import PageLoadingSpinner from '../../components/Loading/PageLoadingSpinner';
import Statistics from './Statistics/Statistics';

const DashBoard = () => {
  const [listUser, setListUser] = useState(null);
  const [listJob, setListJob] = useState(null);
  const [statistics, setStatistics] = useState(null);
  useEffect(() => {
    statisticsAPI().then((statistics) => {
      setStatistics(statistics);
    });
  }, []);
  useEffect(() => {
    fetchApiUser();
    fetchApiJob();
  }, []);
  const fetchApiUser = async () => {
    const users = await getListUserAdminAPI(5);
    setListUser(users.users);
  };
  const fetchApiJob = async () => {
    const jobs = await getListJobAdminAPI();
    setListJob(jobs.jobs);
  };
  return (
    <Box>
      <Header title={'DashBoard'} />
      {statistics && <Statistics statistics={statistics} />}
      {listUser !== null ? (
        <TableUser title={'Người dùng mới'} listUser={listUser} onReload={fetchApiUser} />
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
          <PageLoadingSpinner caption={'Loading list user recent...'} />
        </Box>
      )}
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
export default DashBoard;
