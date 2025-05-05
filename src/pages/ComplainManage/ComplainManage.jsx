import { Box } from '@mui/material';
import Header from '../../components/Header/Admin/Header';
import { useEffect, useState } from 'react';
import { getListComplainAPI } from '../../apis';
import TableComplains from '../../components/TableComplains/TableComplains';
import PageLoadingSpinner from '../../components/Loading/PageLoadingSpinner';

const ComplainMangage = () => {
  const [listComplain, setListComplain] = useState(null);
  useEffect(() => {
    fetchApiComplain();
  }, []);
  const fetchApiComplain = async () => {
    const data = await getListComplainAPI();
    setListComplain(data.complains);
  };
  return (
    <Box>
      <Header title={'Danh sách khiếu nại'} />
      {listComplain !== null ? (
        <TableComplains
          title={'Khiếu nại'}
          listComplain={listComplain}
          onReload={fetchApiComplain}
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
          <PageLoadingSpinner caption={'Loading list job recent...'} />
        </Box>
      )}
    </Box>
  );
};
export default ComplainMangage;
