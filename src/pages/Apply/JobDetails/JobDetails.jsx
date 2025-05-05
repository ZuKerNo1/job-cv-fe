import {
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  Divider
} from '@mui/material';
import { CheckCircle, LocationOn, MonetizationOn, Event, Business } from '@mui/icons-material';

import { convertDateTime } from '../../../utils/formatters';
import parse from 'html-react-parser';
import Contract from '../Contract/Contract';
import Complain from '../Complain/Complain';
const JobDetails = ({ job, contract }) => {
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          {job.position}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 1
          }}
        >
          <Contract contract={contract} />
          <Complain job={job} />
        </Box>
      </Box>

      {/* Thông tin cơ bản */}
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <Typography variant="body1" color="text.secondary">
          <LocationOn fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
          {job.jobLocation}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <MonetizationOn fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
          {job.salary.toLocaleString()}$
        </Typography>
        <Typography variant="body1" color="text.secondary">
          <Event fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
          Hạn nộp hồ sơ: {convertDateTime(job.applicationDeadline)}
        </Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Mô tả công việc */}
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

      <Divider sx={{ my: 2 }} />

      {/* Yêu cầu công việc */}
      <Typography variant="h6" component="h2" gutterBottom>
        Yêu cầu công việc
      </Typography>
      <List
        sx={{
          '&.MuiList-root': {
            display: 'flex',
            flexWrap: 'wrap',
            '& .MuiListItem-root': {
              width: 'fit-content'
            }
          }
        }}
      >
        {job.requirements.map((req, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <CheckCircle color="primary" />
            </ListItemIcon>
            <ListItemText primary={req} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Phúc lợi */}
      <Typography variant="h6" component="h2" gutterBottom>
        Phúc lợi
      </Typography>
      <Typography variant="body1" component="div">
        {job.benefit.split('\n').map((line, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <CheckCircle fontSize="small" color="primary" sx={{ mr: 1 }} />
            <span>{line}</span>
          </Box>
        ))}
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Thông tin nhà tuyển dụng */}
      <Typography variant="h6" component="h2" gutterBottom>
        Thông tin nhà tuyển dụng
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Business color="primary" />
        <Typography variant="body1">
          <strong>{job.employerInfo.companyName}</strong>
        </Typography>
      </Box>
      <Typography variant="body1" color="text.secondary">
        Email: {job.employerInfo.email}
      </Typography>
    </Box>
  );
};
export default JobDetails;
