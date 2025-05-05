import { Box, Chip, Paper, Typography } from '@mui/material';
import Header from '../../components/Header/Admin/Header';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getReviewDetailsAPI } from '../../apis';
import { convertDateTime } from '../../utils/formatters';

const ReviewDetail = () => {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  useEffect(() => {
    getReviewDetailsAPI(id).then((data) => {
      setReview(data);
    });
  }, [id]);
  return (
    <Box>
      <Header title={'Chi tiết đánh giá'} />
      {review && (
        <Paper
          elevation={3}
          sx={{
            maxWidth: '100%',
            borderRadius: '20px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            p: 3
          }}
        >
          {/* Thông tin chính */}
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 3 }}>
            Thông tin chính
          </Typography>
          <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              <strong>Content:</strong> {review.content}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              <strong>Created At:</strong> {convertDateTime(review.createdAt)}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              <strong>Creator ID:</strong> {review.creatorId}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              <strong>Job Seeker ID:</strong> {review.jobSeekerId}
            </Typography>
          </Box>

          {/* Thông tin ứng viên */}
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 3 }}>
            Thông tin ứng viên
          </Typography>
          <Box>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              <strong>Created At:</strong>{' '}
              {new Date(review.jobSeekerInfo.createdAt).toLocaleString()}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              <strong>Desired Salary:</strong> {review.jobSeekerInfo.desiredSalary}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              <strong>Education:</strong> {review.jobSeekerInfo.education}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              <strong>Email:</strong> {review.jobSeekerInfo.email}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              <strong>Expensive:</strong> {review.jobSeekerInfo.expensive}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              <strong>Role:</strong> {review.jobSeekerInfo.role}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              <strong>Status:</strong> {review.jobSeekerInfo.status}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              <strong>Username:</strong> {review.jobSeekerInfo.username}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              <strong>Skills:</strong>
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {review.jobSeekerInfo.skills.map((skill, index) => (
                <Chip key={index} label={skill} color="primary" />
              ))}
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};
export default ReviewDetail;
