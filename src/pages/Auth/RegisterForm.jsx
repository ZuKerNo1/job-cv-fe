import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TrelloIcon from '../../assets/trello-icon.svg?react';
import TextField from '@mui/material/TextField';
import Zoom from '@mui/material/Zoom';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import {
  FIELD_REQUIRED_MESSAGE,
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE,
  PASSWORD_CONFIRMATION_MESSAGE
} from '../../utils/validators';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import FieldErrorAlert from '../../components/Form/FieldErrorAlert';
import { getListJobType, registerUserAPI } from '../../apis';
import { toast } from 'react-toastify';

import { ROLE_USER, SKILLS } from '../../utils/constants';
import { useEffect, useState } from 'react';
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
function RegisterForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control
  } = useForm({
    defaultValues: {
      skills: []
    }
  });
  const [listJobsType, setListJobsType] = useState([]);
  const [customSkills, setCustomSkills] = useState([]);

  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const response = await getListJobType();
        setListJobsType(response);
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
    field.onChange(event.target.value);
  };

  const submitRegister = (data) => {
    delete data.password_confirmation;
    data.role = ROLE_USER.JOB_SEEKER;
    toast.promise(registerUserAPI(data), {
      pending: 'Registering in...',
      success: {
        render() {
          navigate('/login');
          return 'Register success !';
        }
      }
    });
  };
  return (
    <Container
      maxWidth="xs"
      sx={{
        bgcolor: 'white',
        margin: '4em auto auto auto',
        padding: '16px !important',
        borderRadius: 2
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          gap: 1
        }}
      >
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <LockIcon />
        </Avatar>
        <Avatar sx={{ bgcolor: 'primary.main' }}>
          <TrelloIcon />
        </Avatar>
      </Box>
      <form onSubmit={handleSubmit(submitRegister)}>
        <Zoom in={true} style={{ transitionDelay: '200ms' }}>
          <Box>
            <Box>
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="dense"
                error={!!errors['email']}
                {...register('email', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: EMAIL_RULE,
                    message: EMAIL_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'email'} />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="dense"
                error={!!errors['password']}
                {...register('password', {
                  required: FIELD_REQUIRED_MESSAGE,
                  pattern: {
                    value: PASSWORD_RULE,
                    message: PASSWORD_RULE_MESSAGE
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'password'} />
            </Box>
            <Box>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                margin="dense"
                error={!!errors['password_confirmation']}
                {...register('password_confirmation', {
                  validate: (value) => {
                    if (value === watch('password')) return true;
                    return PASSWORD_CONFIRMATION_MESSAGE;
                  }
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'password_confirmation'} />
            </Box>
            <FormControl fullWidth margin="dense">
              <InputLabel>Job Categories</InputLabel>
              <Controller
                name="categories"
                control={control}
                defaultValue={[]}
                rules={{ required: FIELD_REQUIRED_MESSAGE }}
                render={({ field }) => (
                  <Select
                    {...field}
                    multiple
                    label="Job Categories"
                    onChange={(event) => handleChangeJobTypes(event, field)}
                    error={!!errors['categories']}
                    value={field.value}
                    renderValue={(selected) => {
                      const selectedNames = selected
                        .map((id) => listJobsType.find((job) => job._id === id)?.name)
                        .filter(Boolean);
                      return selectedNames.join(', ');
                    }}
                    MenuProps={MenuProps}
                  >
                    {listJobsType.map((job) => (
                      <MenuItem key={job._id} value={job._id}>
                        <Checkbox checked={field.value.indexOf(job._id) > -1} />
                        <ListItemText primary={job.name} />
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              <FieldErrorAlert errors={errors} fieldName={'categories'} />
            </FormControl>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 2,
                marginTop: '8px',
                marginBottom: '4px'
              }}
            >
              <Box>
                <TextField
                  fullWidth
                  label="Expensive"
                  type="number"
                  error={!!errors['expensive']}
                  {...register('expensive', {
                    required: FIELD_REQUIRED_MESSAGE
                  })}
                />
                <FieldErrorAlert errors={errors} fieldName={'expensive'} />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  label="Desired Salary"
                  type="number"
                  error={!!errors['desiredSalary']}
                  {...register('desiredSalary', {
                    required: FIELD_REQUIRED_MESSAGE
                  })}
                />
                <FieldErrorAlert errors={errors} fieldName={'desiredSalary'} />
              </Box>
            </Box>

            <FormControl fullWidth margin="dense">
              <Controller
                name="skills"
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
                      <TextField {...params} label="Skills" error={!!errors['skills']} />
                    )}
                  />
                )}
              />
              <FieldErrorAlert errors={errors} fieldName={'skills'} />
            </FormControl>
            <Box>
              <TextField
                fullWidth
                label="Education"
                margin="dense"
                type="txt"
                error={!!errors['education']}
                {...register('education', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'education'} />
            </Box>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                margin: '8px 0 4px'
              }}
              size="large"
            >
              Register
            </Button>
            <Box sx={{ padding: '0 1em 1em 1em', textAlign: 'center' }}>
              <Typography>Already have an account?</Typography>
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Typography sx={{ color: 'primary.main', '&:hover': { color: '#ffbb39' } }}>
                  Log in!
                </Typography>
              </Link>
            </Box>
          </Box>
        </Zoom>
      </form>
    </Container>
  );
}

export default RegisterForm;
