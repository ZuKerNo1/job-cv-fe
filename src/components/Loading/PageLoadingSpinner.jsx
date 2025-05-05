import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

const PageLoadingSpinner = ({ caption }) => {
  return (
    <>
      <CircularProgress />
      <Typography>{caption}</Typography>
    </>
  );
};
export default PageLoadingSpinner;
