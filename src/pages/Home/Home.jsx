import Box from '@mui/material/Box';
import Header from '../../components/Header/User/Header';
import BannerHero from './BanerHero/BannerHero';
import Feature from './Feature/Feature';
import FeaturedJobs from './FeaturedJobs/FeaturedJobs';
import Footer from '../../components/Footer/Footer';
import JobForYou from './FeaturedJobs/JobForYou';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/User/userSlice';
import { ROLE_USER } from '../../utils/constants';

const Home = () => {
  const user = useSelector(selectCurrentUser);
  return (
    <Box>
      <Header />
      <BannerHero />
      <Feature />
      <FeaturedJobs />
      {user && user.role === ROLE_USER.JOB_SEEKER && <JobForYou />}
      <Footer />
    </Box>
  );
};
export default Home;
