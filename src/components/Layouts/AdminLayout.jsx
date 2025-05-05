import Box from '@mui/material/Box';
import SideBar from '../SideBar/SideBar';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <Box>
      <SideBar />
      <div
        style={{
          marginLeft: '250px',
          padding: '20px',
          transition: 'all 0.3s ease'
        }}
      >
        <Outlet />
      </div>
    </Box>
  );
};
export default AdminLayout;
