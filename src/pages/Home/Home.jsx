import Box from '@mui/material/Box';
import Header from '../../components/Header/User/Header';
import BannerHero from './BanerHero/BannerHero';
import Feature from './Feature/Feature';
import FeaturedJobs from './FeaturedJobs/FeaturedJobs';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <Box>
      <Header />
      <BannerHero />
      <Feature />
      <FeaturedJobs />
      <Footer />
    </Box>
  );
};
export default Home;
