import Box from '@mui/material/Box';
import Header from '../../../components/Header/Admin/Header';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ROLE_USER, SKILLS, STATUS } from '../../../utils/constants';
import { capitalizeFirstLetter, roleName, statusName } from '../../../utils/formatters';
import { useEffect, useState } from 'react';
import { createUserByAdmin, getListEmployer } from '../../../apis';
import Button from '@mui/material/Button';
import { Controller, useForm } from 'react-hook-form';
import {
  EMAIL_RULE,
  EMAIL_RULE_MESSAGE,
  FIELD_REQUIRED_MESSAGE,
  PASSWORD_CONFIRMATION_MESSAGE,
  PASSWORD_RULE,
  PASSWORD_RULE_MESSAGE
} from '../../../utils/validators';
import FieldErrorAlert from '../../../components/Form/FieldErrorAlert';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Checkbox, ListItemText } from '@mui/material';
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
const CreateUser = () => {
  const [role, setRole] = useState(ROLE_USER.JOB_SEEKER);
  const [employers, setEmployers] = useState(null);
  const [employer, setEmployer] = useState('');
  const navigate = useNavigate();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();
  useEffect(() => {
    getListEmployer().then((data) => {
      setEmployers(data.employer);
    });
  }, []);
  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };
  const [skills, setSkills] = useState([]);

  const handleChangeSkills = (event) => {
    const {
      target: { value }
    } = event;
    setSkills(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };
  const handleChangeEmployer = (event) => {
    setEmployer(event.target.value);
  };
  const submitCreateUser = (data) => {
    delete data.password_confirmation;
    if (data.role === ROLE_USER.JOB_SEEKER) {
      delete data.employerId;
      delete data.companyName;
    }
    if (data.role === ROLE_USER.INTERVIEER) {
      delete data.companyName;
      delete data.expensive;
      delete data.desiredSalary;
      delete data.skills;
      delete data.education;
    }
    if (data.role === ROLE_USER.EMPLOYER) {
      delete data.employerId;
      delete data.expensive;
      delete data.desiredSalary;
      delete data.skills;
      delete data.education;
    }

    toast.promise(createUserByAdmin(data), {
      pending: 'Đang tạo mới...',
      success: {
        render() {
          navigate(-1);
          return 'Tạo mới user thành công !';
        }
      }
    });
  };
  return (
    <Box>
      <Header title={'Tạo mới người dùng'} />
      <Box
        sx={{
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          p: '20px',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
          borderRadius: '20px'
        }}
        noValidate
        autoComplete="off"
      >
        <Box
          sx={{
            width: '850px'
          }}
          component="form"
          onSubmit={handleSubmit(submitCreateUser)}
        >
          <Box sx={{ marginBottom: '1em' }}>
            <TextField
              fullWidth
              label="Địa chỉ email: "
              type="email"
              variant="outlined"
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
          <Box sx={{ marginBottom: '1em' }}>
            <TextField
              fullWidth
              label="Mật khẩu: "
              type="password"
              variant="outlined"
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
          <Box sx={{ marginBottom: '1em' }}>
            <TextField
              fullWidth
              label="Xác nhận mật khẩu: "
              type="password"
              variant="outlined"
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
          <FormControl sx={{ marginBottom: '1em', minWidth: 420 }}>
            <InputLabel id="">Chọn quyền :</InputLabel>
            <Controller
              name="role"
              control={control}
              defaultValue={role}
              rules={{ required: FIELD_REQUIRED_MESSAGE }}
              render={({ field }) => (
                <Select
                  label="Chọn quyền"
                  {...field}
                  onChange={(e) => {
                    handleChangeRole(e);
                    field.onChange(e);
                  }}
                >
                  <MenuItem value={ROLE_USER.JOB_SEEKER}>{roleName(ROLE_USER.JOB_SEEKER)}</MenuItem>
                  <MenuItem value={ROLE_USER.EMPLOYER}>{roleName(ROLE_USER.EMPLOYER)}</MenuItem>
                  <MenuItem value={ROLE_USER.INTERVIEER}>{roleName(ROLE_USER.INTERVIEER)}</MenuItem>
                </Select>
              )}
            />
            <FieldErrorAlert errors={errors} fieldName={'role'} />
          </FormControl>
          {role === ROLE_USER.EMPLOYER && (
            <Box sx={{ marginBottom: '1em' }}>
              <TextField
                fullWidth
                label="Tên công ty: "
                type=""
                variant="outlined"
                error={!!errors['password_confirmation']}
                {...register('companyName', {
                  required: FIELD_REQUIRED_MESSAGE
                })}
              />
              <FieldErrorAlert errors={errors} fieldName={'companyName'} />
            </Box>
          )}
          {role === ROLE_USER.INTERVIEER && (
            <Box sx={{ marginBottom: '1em' }}>
              <FormControl sx={{ minWidth: 420 }}>
                <InputLabel id="demo-simple-select-helper-label-2">
                  Chọn nhà tuyển dụng :
                </InputLabel>
                <Controller
                  name="employerId"
                  control={control}
                  defaultValue={employer}
                  rules={{ required: FIELD_REQUIRED_MESSAGE }}
                  render={({ field }) => (
                    <Select
                      label="Chọn nhà tuyển dụng :"
                      {...field}
                      onChange={(e) => {
                        handleChangeEmployer(e);
                        field.onChange(e);
                      }}
                    >
                      {employers !== null &&
                        employers.map((employer) => (
                          <MenuItem key={employer._id} value={employer._id}>
                            {capitalizeFirstLetter(employer.username)}
                          </MenuItem>
                        ))}
                    </Select>
                  )}
                />
                <FieldErrorAlert errors={errors} fieldName={'employerId'} />
              </FormControl>
            </Box>
          )}
          {role === ROLE_USER.JOB_SEEKER && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 2,
                  marginTop: '8px',
                  marginBottom: '4px'
                }}
              >
                <TextField
                  margin="dense"
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
                  margin="dense"
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

              <FormControl fullWidth margin="dense">
                <InputLabel>Skills</InputLabel>
                <Controller
                  name="skills"
                  control={control}
                  defaultValue={[]}
                  rules={{ required: FIELD_REQUIRED_MESSAGE }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      multiple
                      label="Skills"
                      onChange={(event) => {
                        field.onChange(event.target.value);
                        handleChangeSkills(event);
                      }}
                      error={!!errors['skills']}
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
            </>
          )}
          <Box sx={{ marginBottom: '1em' }}>
            <FormControl sx={{ minWidth: 420 }}>
              <InputLabel>Trạng thái tài khoản :</InputLabel>
              <Controller
                name="status"
                control={control}
                defaultValue={employer}
                rules={{ required: FIELD_REQUIRED_MESSAGE }}
                render={({ field }) => (
                  <Select
                    label="Trạng thái tài khoản :"
                    {...field}
                    onChange={(e) => {
                      handleChangeEmployer(e);
                      field.onChange(e);
                    }}
                  >
                    <MenuItem value={STATUS.ACTIVE}>{statusName(STATUS.ACTIVE)}</MenuItem>
                    <MenuItem value={STATUS.INACTIVE}>{statusName(STATUS.INACTIVE)}</MenuItem>
                  </Select>
                )}
              />
              <FieldErrorAlert errors={errors} fieldName={'status'} />
            </FormControl>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Button variant="outlined" type="submit">
              Thêm mới người dùng
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CreateUser;
