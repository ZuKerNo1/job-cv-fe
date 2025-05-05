import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Box,
  Button
} from '@mui/material';
import Header from '../../../components/Header/Admin/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { convertDateTime } from '../../../utils/formatters';
import { getComplainDetailAPI, resolveComplainAPI } from '../../../apis';
import { toast } from 'react-toastify';
const EditComplain = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complain, setComplain] = useState(null);
  useEffect(() => {
    getComplainDetailAPI(id)
      .then((data) => {
        setComplain(data);
      })
      .catch(() => {
        navigate('/*');
      });
  }, [id, navigate]);
  const handleResolveComplain = () => {
    toast.promise(resolveComplainAPI(id), {
      pending: 'Loading...',
      success: {
        render() {
          navigate('/admin/contracts');
          return 'Thay đổi thành công !';
        }
      }
    });
  };
  return (
    <Box>
      <Header title={'Thông tin chi tiết khiếu nại'} />
      {complain && (
        <Card
          sx={{
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            borderRadius: '20px',
            p: 1
          }}
        >
          <CardContent>
            <Box
              sx={{
                marginBottom: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="h5" component="div">
                Thông tin khiếu nại
              </Typography>
              <Button variant="outlined" onClick={handleResolveComplain}>
                Giải quyết
              </Button>
            </Box>
            <Typography variant="body1" color="text.secondary">
              <strong>Ngày tạo:</strong> {convertDateTime(complain.createdAt)}
            </Typography>
            <strong>Mô tả:</strong>
            <Typography variant="body1" color="text.secondary">
              {complain.description}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              <strong>Đã giải quyết:</strong> {complain.isResolved ? 'Có' : 'Không'}
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" component="div" gutterBottom>
              Thông tin nhà tuyển dụng
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Tên công ty" secondary={complain.employerInfo.companyName} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Email" secondary={complain.employerInfo.email} />
              </ListItem>
            </List>

            <Divider sx={{ my: 2 }} />

            <Typography variant="h6" component="div" gutterBottom>
              Thông tin người tìm việc
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="Email" secondary={complain.jobSeekerInfo.email} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Ngày tạo"
                  secondary={convertDateTime(complain.jobSeekerInfo.createdAt)}
                />
              </ListItem>

              <ListItem>
                <ListItemText
                  primary="Tên người dùng"
                  secondary={complain.jobSeekerInfo.username}
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};
export default EditComplain;
