import { Box, Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/User/userSlice';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { createContractAPI } from '../../../apis';
import TinyMCEEditor from '../../../components/TinyMCEEditor/TinyMCEEditor';
import FieldErrorAlert from '../../../components/Form/FieldErrorAlert';

const CreateContract = () => {
  const userCurrent = useSelector(selectCurrentUser);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      description: ''
    }
  });
  const submitContract = async (data) => {
    data.creatorId = userCurrent._id;
    toast.promise(createContractAPI(data), {
      pending: 'Đang tạo mới...',
      success: 'Tạo mới thành công đang chờ phê duyệt !'
    });
  };
  return (
    <Box component="form" onSubmit={handleSubmit(submitContract)}>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Tạo hợp đồng
        </Typography>
      </Box>
      <TinyMCEEditor control={control} name={'description'} />
      <FieldErrorAlert errors={errors} fieldName={'description'} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          m: 2
        }}
      >
        <Button variant="outlined" type="submit">
          Tạo hợp đồng
        </Button>
      </Box>
    </Box>
  );
};
export default CreateContract;
