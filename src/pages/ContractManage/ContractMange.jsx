import Box from '@mui/material/Box';
import Header from '../../components/Header/Admin/Header';
import TableContracts from '../../components/TableContracts/TableContracts';
import { useEffect, useState } from 'react';
import { getListContractAPI } from '../../apis';
import PageLoadingSpinner from '../../components/Loading/PageLoadingSpinner';

const ContractManage = () => {
  const [listContracts, setListContracts] = useState(null);
  useEffect(() => {
    fetchApiContracts();
  }, []);
  const fetchApiContracts = async () => {
    const data = await getListContractAPI();
    setListContracts(data.contracts);
  };
  return (
    <Box>
      <Header title={'Danh sách hợp đồng'} />
      {listContracts !== null ? (
        <TableContracts
          listContracts={listContracts}
          onReload={fetchApiContracts}
          title={'Hợp đồng'}
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
export default ContractManage;
