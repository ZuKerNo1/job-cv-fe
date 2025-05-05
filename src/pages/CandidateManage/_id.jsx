import { Box } from '@mui/material';
import Header from '../../components/Header/Admin/Header';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCandidateDetailsAPI } from '../../apis';
import { Typography, Link, Chip } from '@mui/material';
import { statusName } from '../../utils/formatters';
import parse from 'html-react-parser';

const CandidateDetails = () => {
  const [candidate, setCandidate] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getCandidateDetailsAPI(id)
      .then((data) => {
        if (!data) {
          navigate('/*');
          return;
        }
        setCandidate(data._source);
      })
      .catch(() => {
        navigate('/*', {
          replace: true
        });
      });
  }, [id, navigate]);
  return (
    <Box>
      <Header title={'Thông tin chi tiết ứng viên'} />
      {candidate && (
        <Box
          sx={{
            borderRadius: '20px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            p: 2,
            bgcolor: 'white'
          }}
        >
          <Typography variant="h4" gutterBottom>
            Thông Tin Ứng Viên
          </Typography>
          <Typography variant="h6" gutterBottom>
            Vị trí ứng tuyển: {candidate?.position}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Tên người dùng: {candidate.indoUser?.username}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email: {candidate.indoUser?.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Học vấn: {candidate.indoUser?.education}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Mức lương mong muốn: {candidate.indoUser?.desiredSalary} USD/tháng
          </Typography>
          <Typography variant="body1" gutterBottom>
            Số năm kinh nghiệm: {candidate.indoUser?.expensive} năm
          </Typography>
          <Typography variant="body1" gutterBottom>
            Trạng thái: {statusName(candidate?.status)}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Kỹ năng:
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {candidate.indoUser?.skills.map((skill, index) => (
              <Chip key={index} label={skill} color="primary" />
            ))}
          </Box>
          {/* Cover Letter */}
          <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
            Thư xin việc:
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
            {parse(candidate.coverLetter)}
          </Typography>
          {candidate.cvLink && (
            <Typography variant="body1" gutterBottom>
              CV:{' '}
              <Link href={candidate?.cvLink} target="_blank" rel="noopener noreferrer">
                Xem CV
              </Link>
            </Typography>
          )}
        </Box>
      )}
    </Box>
  );
};
export default CandidateDetails;
