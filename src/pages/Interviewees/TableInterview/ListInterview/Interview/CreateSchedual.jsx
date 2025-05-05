import { toast } from 'react-toastify';
import { createSchedualAPI } from '../../../../../apis';
import styles from '../../../../../styles/Table.module.css';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DateTimeInput from '../../../../../components/Form/DateTimeInput';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../../../redux/User/userSlice';
const CreateSchedual = ({ interviewer }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { control, handleSubmit } = useForm({
    defaultValues: {
      schedual: dayjs().add(3, 'day')
    }
  });
  const currentUser = useSelector(selectCurrentUser);
  const submitCreateSchedual = async (data) => {
    data.jobSeekerId = interviewer.userInfo._id;
    data.creatorId = currentUser._id;
    toast
      .promise(createSchedualAPI(data), {
        pending: 'Loading...'
      })
      .then(() => {
        toast.success('Thêm mới thành công');
        handleClose();
      });
  };
  return (
    <>
      <button className={styles.btn_action + ' ' + styles.btn_edit} onClick={handleClickOpen}>
        <i className="fas fa-edit" /> lên lịch phỏng vấn
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        component="form"
        onSubmit={handleSubmit(submitCreateSchedual)}
      >
        <DialogTitle>Create Schedual</DialogTitle>
        <DialogContent>
          <DateTimeInput control={control} name={'schedual'} title={'Chọn ngày phỏng vấn'} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default CreateSchedual;
