import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const ButtonBack = ({ content, variant, size }) => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => {
        navigate(-1);
      }}
      color="primary"
      size={size ? size : 'small'}
      variant={variant ? variant : 'outlined'}
    >
      {content}
    </Button>
  );
};
export default ButtonBack;
