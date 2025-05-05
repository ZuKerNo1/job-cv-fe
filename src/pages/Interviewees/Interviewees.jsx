import { Box } from '@mui/material';
import Header from '../../components/Header/Admin/Header';
import { useEffect, useState } from 'react';
import { getListCandidatesByInterviewerAPI } from '../../apis';
import TableInterviewer from './TableInterview/TableInterviewer';
import PageLoadingSpinner from '../../components/Loading/PageLoadingSpinner';

const Interviewees = () => {
  const [candidates, setCandidates] = useState(null);

  useEffect(() => {
    fetchCandidateApi();
  }, []);
  const fetchCandidateApi = async () => {
    const data = await getListCandidatesByInterviewerAPI();
    setCandidates(data);
  };
  return (
    <Box>
      <Header title={'Danh sách ứng viên'} />
      {candidates !== null ? (
        <TableInterviewer
          title={'Ứng viên'}
          listInterview={candidates}
          onReload={fetchCandidateApi}
        />
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
export default Interviewees;
