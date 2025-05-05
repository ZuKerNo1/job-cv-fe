import Box from '@mui/material/Box';
import Header from '../../components/Header/Admin/Header';
import { useEffect, useState } from 'react';
import TableUser from '../../components/TableUser/TableUser';
import PageLoadingSpinner from '../../components/Loading/PageLoadingSpinner';
import { getListUserAdminAPI } from '../../apis';

const UserMange = () => {
  const [listUser, setListUser] = useState(null);
  useEffect(() => {
    fetchApiUser();
  }, []);
  const fetchApiUser = async () => {
    const result = await getListUserAdminAPI(20);
    setListUser(result.users);
  };
  return (
    <Box>
      <Header title={'Danh Sách Người Dùng'} />
      {listUser ? (
        <TableUser title={'Người Dùng'} listUser={listUser} onReload={fetchApiUser} />
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
export default UserMange;
