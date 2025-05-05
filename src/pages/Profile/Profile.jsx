import { Box, Typography } from '@mui/material';
import Header from '../../components/Header/User/Header';
import Footer from '../../components/Footer/Footer';
import { ROLE_USER, SKILLS } from '../../utils/constants';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';
import Button from '@mui/material/Button';
import { Controller, useForm } from 'react-hook-form';

import { Checkbox, ListItemText } from '@mui/material';
import { EMAIL_RULE, EMAIL_RULE_MESSAGE, FIELD_REQUIRED_MESSAGE } from '../../utils/validators';
import FieldErrorAlert from '../../components/Form/FieldErrorAlert';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, updateUserAPI } from '../../redux/User/userSlice';
import { toast } from 'react-toastify';
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
const Profile = () => {
  const user = useSelector(selectCurrentUser);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();
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
  const dispatch = useDispatch();

  const submitEditProfile = async (data) => {
    if (user.role === ROLE_USER.EMPLOYER) {
      delete data.employerId;
      delete data.expensive;
      delete data.desiredSalary;
      delete data.skills;
      delete data.education;
    }
    data.expensive = parseInt(data.expensive);
    data.desiredSalary = parseInt(data.desiredSalary);
    if (data.role === ROLE_USER.JOB_SEEKER) {
      delete data.companyName;
    }
    toast
      .promise(dispatch(updateUserAPI({ idUser: user._id, data: { ...data } })), {
        pending: 'Đang chỉnh sửa...'
      })
      .then((res) => {
        if (!res.error) {
          toast.success('Chỉnh sửa thành công !');
        }
      });
  };
  return (
    <Box>
      <Header />
      <Box
        sx={{
          mt: '100px',
          mb: '100px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box
          component="form"
          sx={{
            width: '850px'
          }}
          onSubmit={handleSubmit(submitEditProfile)}
        >
          <Box>
            <Typography variant="h5" sx={{ mb: 2 }}>
              <strong>Thông tin người dùng</strong>
            </Typography>
          </Box>
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

          {user.role === ROLE_USER.EMPLOYER && (
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
          {user.role === ROLE_USER.JOB_SEEKER && (
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
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Button variant="outlined" type="submit" size="large">
              Chỉnh sửa
            </Button>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
export default Profile;
