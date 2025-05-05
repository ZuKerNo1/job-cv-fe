import { toast } from 'react-toastify';
import { createReviewCandidateAPI } from '../../../../../apis';
import styles from '../../../../../styles/Table.module.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../../redux/User/userSlice';
import { DialogContentText, TextField } from '@mui/material';
import { FIELD_REQUIRED_MESSAGE } from '../../../../../utils/validators';
import FieldErrorAlert from '../../../../../components/Form/FieldErrorAlert';
const ReviewCandidate = ({ interviewer }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [content, setContent] = useState('');
  const handleClose = () => {
    setOpen(false);
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm();
  const currentUser = useSelector(selectCurrentUser);
  const submitReviewCandidate = async (data) => {
    data.jobSeekerId = interviewer.userInfo._id;
    data.creatorId = currentUser._id;
    toast
      .promise(createReviewCandidateAPI(data), {
        pending: 'Loading...'
      })
      .then(() => {
        toast.success('Đã đánh giá !');
        reset();
        handleClose();
        setContent('');
      });
  };
  return (
    <>
      <button className={styles.btn_action + ' ' + styles.btn_edit} onClick={handleClickOpen}>
        <i className="fas fa-edit" /> Đánh giá ứng viên
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        component="form"
        maxWidth={'lg'}
        onSubmit={handleSubmit(submitReviewCandidate)}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' }
        }}
      >
        <DialogTitle>Reviews candidate</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" component={'div'}>
            <TextField
              id="filled-multiline-static"
              label="Content"
              multiline
              rows={4}
              variant="standard"
              sx={{
                minWidth: 700
              }}
              error={!!errors['content']}
              {...register('content', {
                required: FIELD_REQUIRED_MESSAGE
              })}
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <FieldErrorAlert errors={errors} fieldName={'content'} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ReviewCandidate;
