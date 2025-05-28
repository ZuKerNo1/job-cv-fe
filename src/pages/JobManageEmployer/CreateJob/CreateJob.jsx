import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Header from '../../../components/Header/Admin/Header';
import TinyMCEEditor from '../../../components/TinyMCEEditor/TinyMCEEditor';
import { Controller, useForm } from 'react-hook-form';
import FieldErrorAlert from '../../../components/Form/FieldErrorAlert';
import { Button, InputLabel, Typography, Autocomplete, Chip } from '@mui/material';
import ButtonBack from '../../../components/ButtonBack/ButtonBack';
import { FIELD_REQUIRED_MESSAGE } from '../../../utils/validators';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';

import { JOB_LOCATION, SKILLS } from '../../../utils/constants';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import DateTimeInput from '../../../components/Form/DateTimeInput';
import { toast } from 'react-toastify';
import { createJobAPI, getListJobType } from '../../../apis';
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
  const [jobTypes, setJobTypes] = useState([]);
  const [customSkills, setCustomSkills] = useState([]);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      applicationDeadline: dayjs().add(3, 'day'),
      description: '',
      idCategory: [] // Add default value for jobType
    }
  });

  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const response = await getListJobType();
        setJobTypes(response);
      } catch (error) {
        toast.error('Không thể tải danh sách loại công việc');
      }
    };
    fetchJobTypes();
  }, []);

  const handleChangeSkills = (event, newValue) => {
    setCustomSkills(newValue);
  };

  const handleChangeJobTypes = (event, field) => {
    const {
      target: { value }
    } = event;
    field.onChange(value);
  };

  const submitCreateJob = async (data) => {
    data.creatorId = userCurrent._id;
    toast.promise(createJobAPI(data), {
      pending: 'Đang tạo mới...',
      success: {
        render() {
          navigate('/employer/jobs');
          return 'Tạo mới thành công !';
        }
      },
      error: 'Có lỗi xảy ra khi tạo việc làm'
    });
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
          <Controller
            name="requirements"
            control={control}
            defaultValue={[]}
            rules={{ required: FIELD_REQUIRED_MESSAGE }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                multiple
                options={SKILLS}
                value={customSkills}
                onChange={(event, newValue) => {
                  field.onChange(newValue);
                  handleChangeSkills(event, newValue);
                }}
                freeSolo
                renderTags={(value, getTagProps) =>
                  value.map((option, index) => (
                    <Chip key={index} label={option} {...getTagProps({ index })} />
                  ))
                }
                renderInput={(params) => (
                  <TextField {...params} label="Requirements" error={!!errors['requirements']} />
                )}
              />
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

        <FormControl fullWidth margin="normal">
          <InputLabel>Loại công việc</InputLabel>
          <Controller
            name="idCategory"
            control={control}
            defaultValue={[]}
            rules={{ required: FIELD_REQUIRED_MESSAGE }}
            render={({ field }) => (
              <Select
                {...field}
                label="Loại công việc"
                onChange={(event) => handleChangeJobTypes(event, field)}
                error={!!errors['idCategory']}
                value={field.value}
                renderValue={(selected) => {
                  return jobTypes
                    .filter((type) => selected.includes(type._id))
                    .map((type) => type.name)
                    .join(', ');
                }}
                MenuProps={MenuProps}
              >
                {jobTypes.map((type) => (
                  <MenuItem key={type._id} value={type._id}>
                    <Checkbox checked={field.value.indexOf(type._id) > -1} />
                    <ListItemText primary={type.name} />
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <FieldErrorAlert errors={errors} fieldName={'idCategory'} />
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
