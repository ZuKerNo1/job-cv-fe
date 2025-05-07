import { Box } from '@mui/material';
import Header from '../../components/Header/User/Header';
import Footer from '../../components/Footer/Footer';
import FormSearchJob from '../../components/FormSearchJob/FormSearchJon';
import { useEffect, useState } from 'react';
import { getListJobByUserAPI } from '../../apis';
import JobItem from '../../components/JobItem/JobItem';
import { useSearchParams } from 'react-router-dom';

const Search = () => {
  const [searchParams] = useSearchParams();

  const salary = searchParams.get('salary') || '';
  const workLocation = searchParams.get('work-location') || '';
  const idCategories = searchParams.get('idCategory')?.split(',') || [];
  const [listJob, setListJob] = useState(null);

  useEffect(() => {
    fetchSearchJobApi(idCategories, workLocation, salary);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSearchJobApi = async (idCategories, workLocation, salary) => {
    const data = await getListJobByUserAPI(10, idCategories, workLocation, salary);
    setListJob(data.jobs);
  };

  return (
    <Box>
      <Header />
      <Box
        sx={{
          mt: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      ></Box>
      <Box
        sx={{
          mt: 4,
          bgcolor: 'white',
          padding: 4
        }}
      >
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <FormSearchJob onSearch={fetchSearchJobApi} />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
            padding: '10px'
          }}
        >
          {listJob ? (
            listJob.map((job) => (
              <Box
                key={job._id}
                sx={{
                  flex: 1
                }}
              >
                <JobItem job={job} />
              </Box>
            ))
          ) : (
            <></>
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
export default Search;
