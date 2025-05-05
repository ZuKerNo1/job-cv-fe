import { Card, CardContent, Box, Container } from '@mui/material';
import Header from '../../components/Header/User/Header';
import Footer from '../../components/Footer/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getJobDetailsJobByUserAPI } from '../../apis';

import FormApply from './FormApply/FormApply';
import JobDetails from './JobDetails/JobDetails';

const Apply = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    getJobDetailsJobByUserAPI(id)
      .then((data) => {
        if (!data) {
          navigate('/*');
          return;
        }
        setJob(data);
      })
      .catch(() => {
        navigate('/*', {
          replace: true
        });
      });
  }, [id, navigate]);

  return (
    <Box>
      <Header />
      {/* Job Details */}
      {job ? (
        <Container sx={{ margin: 'auto', mt: '90px' }}>
          <Box>
            <Card
              sx={{
                borderRadius: 2
              }}
            >
              <CardContent>
                <JobDetails job={job} contract={job.contract} />
                <FormApply job={job} />
              </CardContent>
            </Card>
          </Box>
        </Container>
      ) : (
        <></>
      )}
      <Footer />
    </Box>
  );
};
export default Apply;
