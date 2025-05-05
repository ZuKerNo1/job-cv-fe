import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Header from '../../components/Header/Admin/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserDetail } from '../../apis';
import Typography from '@mui/material/Typography';
import { roleName, statusName } from '../../utils/formatters';
import ButtonBack from '../../components/ButtonBack/ButtonBack';
import { STATUS } from '../../utils/constants';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getUserDetail(id)
      .then((user) => {
        if (!user) {
          return navigate('/*');
        }
        setUser(user);
      })
      .catch(() => {
        navigate('/*', {
          replace: true
        });
      });
  }, [id, navigate]);
  return (
    <Box>
      <Header title={'Thông tin chi tiết người dùng'} />
      <Card
        sx={{
          maxWidth: '100%',
          borderRadius: '20px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          p: 2
        }}
      >
        {user && (
          <CardContent>
            <Typography variant="h5" sx={{ mb: 2 }}>
              <strong>Tên:</strong> {user.username}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography variant="h6" sx={{ mb: 2, color: '#ff5722' }}>
              <strong>Quyền hạn:</strong> {roleName(user.role)}
            </Typography>

            {user.role === 'employer' && (
              <Typography variant="h6" sx={{ mt: 2 }}>
                <strong>Công ty:</strong> {user.companyName || 'ten cong ty'}
              </Typography>
            )}

            {user.role === 'interviewer' && user.companyInfo && (
              <Typography variant="h6" sx={{ mt: 2 }}>
                <strong>Thông tin công ty:</strong> {user.companyInfo}
              </Typography>
            )}
            <Typography
              variant="h6"
              sx={{
                mt: 2,
                color: `${user.status === STATUS.ACTIVE ? 'success.light' : 'error.dark'}`
              }}
            >
              <strong>Trạng thái:</strong> {statusName(user.status)}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <ButtonBack content="Trở về" size="large" variant="outlined" />
            </Box>
          </CardContent>
        )}
      </Card>
    </Box>
  );
};
export default UserDetail;
