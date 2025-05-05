import { Box, Button, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';
import FieldErrorAlert from '../../../components/Form/FieldErrorAlert';
import { useForm } from 'react-hook-form';
import { FIELD_REQUIRED_MESSAGE } from '../../../utils/validators';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/User/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ROLE_USER } from '../../../utils/constants';
import { createComplainAPI } from '../../../apis';
const Complain = ({ job }) => {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState('');
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm();
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const submitComplain = async (data) => {
    if (!currentUser) {
      navigate('/login');
      toast.warn('Vui lòng đăng nhập !');
      return;
    }
    if (currentUser.role !== ROLE_USER.JOB_SEEKER) {
      toast.warn('Chức năng chỉ cho người tìm việc !');
      return;
    }
    data.jobSeekerId = currentUser._id;
    data.employerId = job.creatorId;
    toast
      .promise(createComplainAPI(data), {
        pending: 'Loading...'
      })
      .then((res) => {
        if (!res.error) {
          toast.success('Đã gửi khiếu nại !');
        }
      });

    setDescription('');
    handleClose();
  };
  return (
    <Box>
      <Button
        onClick={handleClickOpen}
        sx={{
          display: 'flex',
          gap: 0.5
        }}
        variant="outlined"
        size="small"
        color="error"
      >
        <i className="fa-solid fa-circle-exclamation"></i> <span>Báo cáo</span>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={'lg'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // PaperProps={{}}
        component="form"
        onSubmit={handleSubmit(submitComplain)}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
      >
        <DialogTitle id="alert-dialog-title">Báo cáo</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" component={'div'}>
            <TextField
              id="filled-multiline-static"
              label="Description"
              multiline
              rows={4}
              variant="standard"
              sx={{
                minWidth: 700
              }}
              error={!!errors['description']}
              {...register('description', {
                required: FIELD_REQUIRED_MESSAGE
              })}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
            <FieldErrorAlert errors={errors} fieldName={'description'} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Complain;
