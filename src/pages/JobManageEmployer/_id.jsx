import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import Header from '../../components/Header/Admin/Header';
import { useEffect, useState } from 'react';
import { getDetailsJob } from '../../apis';
import { useNavigate, useParams } from 'react-router-dom';
import { convertDateTime } from '../../utils/formatters';
import parse from 'html-react-parser';

const JobDetails = () => {
  const [job, setJob] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getDetailsJob(id)
      .then((data) => {
        if (!data) {
          return navigate('/404');
        }
        setJob(data);
      })
      .catch(() => {
        navigate('/404');
      });
  }, [id, navigate]);

  return (
    <Box>
      <Header title={'Thông tin chi tiết việc làm'} />
      {job && (
        <Box
          sx={{
            borderRadius: '20px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            p: 2,
            bgcolor: 'white'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Thông Tin Công Việc
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Typography variant="h6" gutterBottom>
            Vị Trí: {job.position}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Loại công việc: {job.categoryDetails.name}
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom>
            Mô tả công việc
          </Typography>
          <Typography
            variant="body1"
            component="h2"
            gutterBottom
            sx={{
              '& ul': {
                paddingLeft: '20px',
                marginLeft: '20px'
              }
            }}
          >
            {parse(job.description)}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong>Địa Điểm Làm Việc:</strong> {job.jobLocation}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong>Mức Lương:</strong> ${job.salary}
          </Typography>

          <Typography variant="body1" gutterBottom>
            <strong>Hạn Nộp Hồ Sơ:</strong> {convertDateTime(job.applicationDeadline)}
          </Typography>

          <Typography variant="h6" component="h2">
            Phúc lợi :
          </Typography>
          <Typography variant="body1" component="div">
            {job.benefit.split('\n').map((line, index) => (
              <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <span>{line}</span>
              </Box>
            ))}
          </Typography>

          <Typography variant="h6" gutterBottom>
            Yêu Cầu Công Việc
          </Typography>
          <List>
            {job.requirements.map((requirement, index) => (
              <ListItem key={index}>
                <ListItemText primary={`- ${requirement}`} />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};
export default JobDetails;
