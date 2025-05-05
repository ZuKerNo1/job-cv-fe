import { Box, Container } from '@mui/material';
import Header from '../../components/Header/User/Header';
import Footer from '../../components/Footer/Footer';
import { useEffect, useState } from 'react';
import { getJobAppliedAPI } from '../../apis';
import TableJobApplied from './TableJobApplied/TableJobApplied';

const JobApplied = () => {
  const [listJobApplied, setListJobApplied] = useState(null);
  useEffect(() => {
    getJobAppliedAPI().then((data) => {
      setListJobApplied(data);
    });
  }, []);
  return (
    <Box>
      <Header />
      <Container sx={{ margin: 'auto', mt: '90px' }}>
        {listJobApplied && (
          <TableJobApplied
            title={'Danh sách công việc đã ứng tuyển'}
            listJobApplied={listJobApplied}
          />
        )}
      </Container>
      <Footer />
    </Box>
  );
};
export default JobApplied;
