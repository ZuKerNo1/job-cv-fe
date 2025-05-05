import { Box } from '@mui/material';
import Header from '../../components/Header/Admin/Header';
import { useEffect, useState } from 'react';
import { getListCandidatesAPI } from '../../apis';
import TableCandidates from '../../components/TableCandidates/TableCandidates';
import PageLoadingSpinner from '../../components/Loading/PageLoadingSpinner';
import FormSearch from './FormSearch/FormSearch';

const CandidateManage = () => {
  const [listCandidate, setListCandidate] = useState(null);

  useEffect(() => {
    fetchListCandidateApi();
  }, []);
  const fetchListCandidateApi = async (query) => {
    const data = await getListCandidatesAPI(query);
    setListCandidate(data);
  };

  return (
    <Box>
      <Header title={'Danh sách ứng viên'} />
      {listCandidate !== null ? (
        <Box>
          <TableCandidates
            title={'Lọc ứng viên'}
            listCandidates={listCandidate}
            onReload={fetchListCandidateApi}
            FormSearch={FormSearch}
          />
        </Box>
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
export default CandidateManage;
