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
import { useEffect, useState } from 'react';
import DateTimeInput from '../../../components/Form/DateTimeInput';
import { toast } from 'react-toastify';
import { getDetailsJob, getListJobType, updateJobAPI } from '../../../apis';
import { useNavigate, useParams } from 'react-router-dom';

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

const EditJobEmployer = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {}
  });

  const [job, setJob] = useState(null);
  const [jobTypes, setJobTypes] = useState([]);
  const { id } = useParams();
  const submitCreateJob = async (data) => {
    data.salary = parseInt(data.salary);
    data.applicationDeadline = new Date(data.applicationDeadline)
      .toISOString()
      .replace('Z', '+00:00');
    toast.promise(updateJobAPI(id, data), {
      pending: 'Đang update...',
      success: {
        render() {
          navigate('/employer/jobs');
          return 'Update thành công !';
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
    getDetailsJob(id)
      .then((data) => {
        if (!data) {
          return navigate('/*');
        }
        setJob(data);
      })
      .catch(() => {
        navigate('/*');
      });
  }, [id, navigate]);
  return (
    <Box>
      <Header title={'Chỉnh sửa'} />
      {job && (
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
              defaultValue={job.position}
            />
            <FieldErrorAlert errors={errors} fieldName={'position'} />
          </Box>
          <Box sx={{ margin: '16px 0' }}>
            <InputLabel sx={{ marginLeft: 1, marginBottom: 0.5 }}>Chi tiết công việc :</InputLabel>
            <TinyMCEEditor control={control} name={'description'} initialValue={job.description} />
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
              defaultValue={job.benefit}
            />
            <FieldErrorAlert errors={errors} fieldName={'benefit'} />
          </Box>
          <FormControl fullWidth margin="dense">
            <InputLabel>Requirements</InputLabel>
            <Controller
              name="requirements"
              control={control}
              defaultValue={job.requirements}
              rules={{ required: FIELD_REQUIRED_MESSAGE }}
              render={({ field }) => (
                <Select
                  {...field}
                  multiple
                  label="Requirements"
                  onChange={(event) => {
                    field.onChange(event.target.value);
                  }}
                  defaultValue={job.requirements}
                  error={!!errors['requirements']}
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
              defaultValue={job.salary}
            />
            <FieldErrorAlert errors={errors} fieldName={'salary'} />
          </Box>
          <Box>
            <DateTimeInput
              control={control}
              name={'applicationDeadline'}
              title={'Chọn ngày hết hạn'}
              value={job.applicationDeadline}
            />
            <FieldErrorAlert errors={errors} fieldName={'applicationDeadline'} />
          </Box>
          <FormControl fullWidth margin="normal">
            <InputLabel>Địa điểm làm việc</InputLabel>
            <Controller
              name="jobLocation"
              control={control}
              defaultValue={job.jobLocation}
              rules={{ required: FIELD_REQUIRED_MESSAGE }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Địa điểm làm việc"
                  onChange={(event) => {
                    field.onChange(event.target.value);
                  }}
                  error={!!errors['jobLocation']}
                  defaultValue={field.value}
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
              defaultValue={job.idCategory}
              rules={{ required: FIELD_REQUIRED_MESSAGE }}
              render={({ field }) => (
                <Select
                  {...field}
                  label="Loại công việc"
                  error={!!errors['idCategory']}
                  value={field.value}
                >
                  {jobTypes.map((type) => (
                    <MenuItem key={type._id} value={type._id}>
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
              Chỉnh sửa việc làm
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default EditJobEmployer;
