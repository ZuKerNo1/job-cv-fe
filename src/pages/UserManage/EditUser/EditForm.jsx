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
import { getListEmployer, getUserDetail, updateUser } from '../../../apis';
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
import { useNavigate, useParams } from 'react-router-dom';
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
const EditUser = () => {
  const { id } = useParams();
  const [role, setRole] = useState('');
  const [employers, setEmployers] = useState(null);
  const [employer, setEmployer] = useState('');
  const [user, setUser] = useState(null);
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
    getUserDetail(id)
      .then((user) => {
        setRole(user.role);
        if (user.role === ROLE_USER.INTERVIEER) {
          setEmployer(user.employerId);
        }
        setUser(user);
      })
      .catch(() => {
        navigate('/*');
      });
  }, [id, navigate]);
  const handleChangeRole = (event) => {
    setRole(event.target.value);
  };
  const handleChangeEmployer = (event) => {
    setEmployer(event.target.value);
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
  const submitEditUser = async (data) => {
    delete data.password_confirmation;
    if (!data.password) {
      delete data.password;
    }
    if (data.role === ROLE_USER.JOB_SEEKER) {
      delete data.employerId;
      delete data.companyName;
      data.expensive = parseInt(data.expensive);
      data.desiredSalary = parseInt(data.desiredSalary);
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
    toast.promise(updateUser(id, data), {
      pending: 'Đang chỉnh sửa...',
      success: {
        render() {
          navigate('/admin/users');
          return 'Chỉnh sửa user thành công !';
        }
      }
    });
  };
  return (
    <Box>
      <Header title={'Chỉnh sửa người dùng'} />
      {user && (
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
            onSubmit={handleSubmit(submitEditUser)}
          >
            <Box sx={{ marginBottom: '1em' }}>
              <TextField
                fullWidth
                label="Địa chỉ email: "
                type="email"
                variant="outlined"
                error={!!errors['email']}
                InputLabelProps={{ shrink: true }}
                defaultValue={user.email}
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
                required={false}
                label="Mật khẩu: "
                type="password"
                variant="outlined"
                error={!!errors['password']}
                {...register('password', {
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
                required={false}
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
                    <MenuItem value={ROLE_USER.JOB_SEEKER}>
                      {roleName(ROLE_USER.JOB_SEEKER)}
                    </MenuItem>
                    <MenuItem value={ROLE_USER.EMPLOYER}>{roleName(ROLE_USER.EMPLOYER)}</MenuItem>
                    <MenuItem value={ROLE_USER.INTERVIEER}>
                      {roleName(ROLE_USER.INTERVIEER)}
                    </MenuItem>
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
                  defaultValue={user?.companyName}
                  variant="outlined"
                  error={!!errors['companyName']}
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
                <Box sx={{ marginBottom: '1em' }}>
                  <TextField
                    margin="dense"
                    fullWidth
                    label="Expensive"
                    type="number"
                    error={!!errors['expensive']}
                    {...register('expensive', {
                      required: FIELD_REQUIRED_MESSAGE
                    })}
                    defaultValue={user?.expensive}
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
                    defaultValue={user?.desiredSalary}
                  />
                  <FieldErrorAlert errors={errors} fieldName={'desiredSalary'} />
                </Box>

                <FormControl fullWidth margin="dense">
                  <InputLabel>Skills</InputLabel>
                  <Controller
                    name="skills"
                    control={control}
                    defaultValue={user?.skills || []}
                    rules={{ required: FIELD_REQUIRED_MESSAGE }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        multiple
                        defaultValue={user?.skills || []}
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
                <Box sx={{ mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Education"
                    margin="dense"
                    type="txt"
                    error={!!errors['education']}
                    {...register('education', {
                      required: FIELD_REQUIRED_MESSAGE
                    })}
                    defaultValue={user?.education}
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
                  defaultValue={user.status}
                  rules={{ required: FIELD_REQUIRED_MESSAGE }}
                  render={({ field }) => (
                    <Select label="Trạng thái tài khoản :" {...field}>
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
                Chỉnh sửa người dùng
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
export default EditUser;
