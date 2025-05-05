import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Header from '../../../components/Header/Admin/Header';
import TinyMCEEditor from '../../../components/TinyMCEEditor/TinyMCEEditor';
import { Controller, useForm } from 'react-hook-form';
import FieldErrorAlert from '../../../components/Form/FieldErrorAlert';
import { Button, InputLabel, Typography } from '@mui/material';
import ButtonBack from '../../../components/ButtonBack/ButtonBack';
import { FIELD_REQUIRED_MESSAGE } from '../../../utils/validators';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

import { JOB_LOCATION, SKILLS } from '../../../utils/constants';
import { useState } from 'react';
import dayjs from 'dayjs';
import DateTimeInput from '../../../components/Form/DateTimeInput';
import { toast } from 'react-toastify';
import { createJobAPI } from '../../../apis';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/User/userSlice';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const CreateJob = () => {
  const navigate = useNavigate();
  const userCurrent = useSelector(selectCurrentUser);
  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      applicationDeadline: dayjs().add(3, 'day'),
      description: ''
    }
  });
  const submitCreateJob = async (data) => {
    data.creatorId = userCurrent._id;
    toast.promise(createJobAPI(data), {
      pending: 'Đang tạo mới...',
      success: {
        render() {
          navigate('/employer/jobs');
          return 'Tạo mới thành công !';
        }
      }
    });
  };
  const [skills, setSkills] = useState([]);
  const handleChangeSkills = (event) => {
    const {
      target: { value }
    } = event;
    setSkills(typeof value === 'string' ? value.split(',') : value);
  };
  return (
    <Box>
      <Header title={'Đăng tin tuyển dụng mới'} />
      <Box
        component="form"
        sx={{
          padding: 3,
          borderRadius: '20px',
          p: 3,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          bgcolor: 'white'
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(submitCreateJob)}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Thêm mới tin tuyển dụng
          </Typography>
        </Box>
        <Box>
          <TextField
            id="title"
            label="Vị trí"
            variant="outlined"
            fullWidth
            type="txt"
            margin="dense"
            error={!!errors['position']}
            {...register('position', {
              required: FIELD_REQUIRED_MESSAGE
            })}
          />
          <FieldErrorAlert errors={errors} fieldName={'position'} />
        </Box>
        <Box sx={{ margin: '16px 0' }}>
          <InputLabel sx={{ marginLeft: 1, marginBottom: 0.5 }}>Chi tiết công việc :</InputLabel>
          <TinyMCEEditor control={control} name={'description'} />
          <FieldErrorAlert errors={errors} fieldName={'description'} />
        </Box>
        <Box>
          <TextField
            label="Lợi ích"
            variant="outlined"
            fullWidth
            margin="dense"
            multiline
            rows={4}
            error={!!errors['benefit']}
            {...register('benefit', {
              required: FIELD_REQUIRED_MESSAGE
            })}
          />
          <FieldErrorAlert errors={errors} fieldName={'benefit'} />
        </Box>
        <FormControl fullWidth margin="dense">
          <InputLabel>Requirements</InputLabel>
          <Controller
            name="requirements"
            control={control}
            defaultValue={[]}
            rules={{ required: FIELD_REQUIRED_MESSAGE }}
            render={({ field }) => (
              <Select
                {...field}
                multiple
                label="Requirements"
                onChange={(event) => {
                  field.onChange(event.target.value);
                  handleChangeSkills(event);
                }}
                error={!!errors['requirements']}
                value={field.value}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {SKILLS.map((skill) => (
                  <MenuItem key={skill} value={skill}>
                    <Checkbox checked={skills.indexOf(skill) > -1} />
                    <ListItemText primary={skill} />
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FieldErrorAlert errors={errors} fieldName={'requirements'} />
        </FormControl>
        <Box>
          <TextField
            type="number"
            label="Mức lương ($)"
            variant="outlined"
            fullWidth
            margin="dense"
            error={!!errors['salary']}
            {...register('salary', {
              required: FIELD_REQUIRED_MESSAGE
            })}
          />
          <FieldErrorAlert errors={errors} fieldName={'salary'} />
        </Box>
        <Box>
          <DateTimeInput
            control={control}
            name={'applicationDeadline'}
            title={'Chọn ngày hết hạn'}
          />
          <FieldErrorAlert errors={errors} fieldName={'applicationDeadline'} />
        </Box>
        <FormControl fullWidth margin="normal">
          <InputLabel>Địa điểm làm việc</InputLabel>
          <Controller
            name="jobLocation"
            control={control}
            defaultValue={''}
            rules={{ required: FIELD_REQUIRED_MESSAGE }}
            render={({ field }) => (
              <Select
                {...field}
                label="Địa điểm làm việc"
                onChange={(event) => {
                  field.onChange(event.target.value);
                  handleChangeSkills(event);
                }}
                error={!!errors['jobLocation']}
                value={field.value}
              >
                {JOB_LOCATION.map((jobLocation) => (
                  <MenuItem key={jobLocation} value={jobLocation}>
                    <ListItemText primary={jobLocation} />
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FieldErrorAlert errors={errors} fieldName={'jobLocation'} />
        </FormControl>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '4px 0 0 0'
          }}
        >
          <ButtonBack content={'Trở về'} />
          <Button type="submit" variant="outlined">
            Thêm mới việc làm
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default CreateJob;
