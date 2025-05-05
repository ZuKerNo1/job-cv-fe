import Box from '@mui/material/Box';
import Header from '../../components/Header/Admin/Header';
import { useEffect, useState } from 'react';
import TableJobTypes from '../../components/TableJobTypes/TableJobTypes';
import PageLoadingSpinner from '../../components/Loading/PageLoadingSpinner';

const JobTypeManage = () => {
  const [listJobTypes, setListJobTypes] = useState(null);

  useEffect(() => {
    fetchJobTypes();
  }, []);

  const fetchJobTypes = async () => {
    // TODO: Replace with actual API call
    const mockData = [
      { _id: '1', name: 'Full-time', description: 'Công việc toàn thời gian', jobCount: 10 },
      { _id: '2', name: 'Part-time', description: 'Công việc bán thời gian', jobCount: 5 }
    ];
    setListJobTypes(mockData);
  };

  return (
    <Box>
      <Header title={'Quản lý loại công việc'} />
      {listJobTypes ? (
        <TableJobTypes
          title={'Danh sách loại công việc'}
          listJobTypes={listJobTypes}
          onReload={fetchJobTypes}
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
          <PageLoadingSpinner caption={'Đang tải danh sách...'} />
        </Box>
      )}
    </Box>
  );
};

export default JobTypeManage;
