import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Header from '../../../components/Header/Admin/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { changeStatusJob, getDetailsJob } from '../../../apis';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import { Controller, useForm } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FieldErrorAlert from '../../../components/Form/FieldErrorAlert';
import { STATUS } from '../../../utils/constants';
import { statusName } from '../../../utils/formatters';
import { FIELD_REQUIRED_MESSAGE } from '../../../utils/validators';
import parse from 'html-react-parser';
import { toast } from 'react-toastify';
const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState();
  useEffect(() => {
    getDetailsJob(id)
      .then((data) => {
        setJob(data);
      })
      .catch(() => {
        navigate('/*');
      });
  }, [id, navigate]);
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();
  const changeStatus = (data) => {
    toast.promise(changeStatusJob(id, data.status), {
      pending: 'Lưu thay đổi...',
      success: {
        render() {
          navigate('/admin/jobs');
          return 'Thay đổi trạng thái thành công !';
        }
      }
    });
  };
  return (
    <Box>
      <Header title={'Phê duyệt công việc'} />
      {job && (
        <Box
          sx={{
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            p: '20px',
            borderRadius: '20px',
            bgcolor: '#fff'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <Typography
              variant="h5"
              component="h2"
              gutterBottom
              sx={{
                fontWeight: 600
              }}
            >
              {job.position}
            </Typography>
            <Button variant="outlined" component="form" onClick={handleSubmit(changeStatus)}>
              Lưu thay đổi
            </Button>
          </Box>

          <Typography
            variant="body1"
            paragraph
            gutterBottom
            sx={{
              '& ul': {
                paddingLeft: '20px',
                marginLeft: '20px'
              }
            }}
          >
            {parse(job.description)}
          </Typography>

          <Typography variant="h6" component="h2" gutterBottom>
            Lợi ích :
          </Typography>
          <Typography variant="body1" component="h2" gutterBottom>
            {job.benefit}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1
            }}
          >
            <Typography variant="h6" component="h2" gutterBottom>
              Yêu cầu :
            </Typography>
            <Stack direction="row" spacing={1}>
              {job.requirements.map((r) => (
                <Chip key={r} label={r} />
              ))}
            </Stack>
          </Box>

          <Box sx={{ marginTop: 2 }}>
            <Typography variant="body1" paragraph>
              <strong>Hạn nộp hồ sơ:</strong>{' '}
              {dayjs(job.applicationDeadline).format('MMM DD YYYY HH:mm')}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Địa chỉ làm việc:</strong> {job.jobLocation}
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Mức lương cơ bản:</strong> {job.salary} $
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Typography variant="body1" paragraph>
                <strong>Trạng thái:</strong>
              </Typography>
              <Box sx={{ marginBottom: '1em' }}>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Trạng thái tài khoản :</InputLabel>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue={job.status}
                    rules={{ required: FIELD_REQUIRED_MESSAGE }}
                    render={({ field }) => (
                      <Select label="Trạng thái công việc :" {...field} size="small">
                        <MenuItem value={STATUS.PENDING}>{statusName(STATUS.PENDING)}</MenuItem>
                        <MenuItem value={STATUS.REJECT}>{statusName(STATUS.REJECT)}</MenuItem>
                        <MenuItem value={STATUS.ACCEPT}>{statusName(STATUS.ACCEPT)}</MenuItem>
                      </Select>
                    )}
                  />
                  <FieldErrorAlert errors={errors} fieldName={'status'} />
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default EditJob;
