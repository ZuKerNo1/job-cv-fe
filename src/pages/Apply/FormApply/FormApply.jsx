import { Typography, Box, Button, TextField, InputLabel } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

import { Controller, useForm } from 'react-hook-form';
import TinyMCEEditor from '../../../components/TinyMCEEditor/TinyMCEEditor';
import FieldErrorAlert from '../../../components/Form/FieldErrorAlert';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/User/userSlice';
import { ROLE_USER } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { applyJobAPI } from '../../../apis';
const FormApply = ({ job }) => {
  // Xử lý khi người dùng chọn file
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  const currentUser = useSelector(selectCurrentUser);
  const selectedFile = watch('cvLink');
  const navigate = useNavigate();
  const submitApply = async (data) => {
    if (!currentUser) {
      navigate('/login');
      toast.warn('Vui lòng tạo tài khoản');
      return;
    }
    const formData = new FormData();
    if (currentUser.role !== ROLE_USER.JOB_SEEKER) {
      navigate('/login');
      toast.error('Chức năng này chỉ cho người tìm việc');
      return;
    }
    if (data.cvLink) {
      formData.append('cvLink', data.cvLink);
    } else {
      delete data.cvLink;
    }
    data.jobSeekerId = currentUser._id;
    data.employerId = job.employerInfo._id;
    data.jobId = job._id;
    data.position = job.position;
    formData.append('jobSeekerId', data.jobSeekerId);
    formData.append('employerId', data.employerId);
    formData.append('jobId', data.jobId);
    formData.append('coverLetter', data.coverLetter);
    formData.append('position', data.position);
    toast.promise(applyJobAPI(formData), {
      pending: 'Loading...',
      success: 'Ứng tuyển thành công !'
    });
  };

  return (
    <Box
      sx={{
        mt: 2
      }}
      component="form"
      onSubmit={handleSubmit(submitApply)}
    >
      <Box>
        <InputLabel sx={{ marginLeft: 1, marginBottom: 0.5, fontWeight: 'bold' }}>
          Thư xin việc :
        </InputLabel>
        <TinyMCEEditor control={control} name={'coverLetter'} />
        <FieldErrorAlert errors={errors} fieldName={'coverLetter'} />
      </Box>
      <Box sx={{ maxWidth: '250px', mt: 2 }}>
        <Box>
          {/* Job Details */}
          <Controller
            name="cvLink"
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  variant="outlined"
                  type="file"
                  onChange={(e) => {
                    field.onChange(e.target.files[0]);
                  }}
                  InputProps={{
                    style: { display: 'none' }
                  }}
                  id="cvLink"
                  inputProps={{ accept: 'application/pdf' }}
                />
                <label htmlFor="cvLink">
                  <Button
                    variant="contained"
                    component="span"
                    startIcon={<CloudUpload />}
                    fullWidth
                    sx={{ mb: 2 }}
                  >
                    Chọn file CV (file pdf)
                  </Button>
                </label>
              </>
            )}
          />

          {selectedFile && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="body1">
                File đã chọn: <strong>{selectedFile.name}</strong>
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end'
        }}
      >
        <Button variant="outlined" color="primary" sx={{ minWidth: '200px' }} type="submit">
          Apply
        </Button>
      </Box>
    </Box>
  );
};
export default FormApply;
