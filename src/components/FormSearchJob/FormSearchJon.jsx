import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  useTheme
} from '@mui/material';
import { useState } from 'react';
import { JOB_LOCATION, SKILLS } from '../../utils/constants';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
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
function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}
const FormSearchJob = ({ onSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const theme = useTheme();
  const [workLocation, setWorkLocation] = useState(searchParams.get('work-location') || '');
  const [skills, setSkills] = useState(searchParams.get('skills')?.split(',') || []);
  const [salary, setSalary] = useState(searchParams.get('salary') || '');
  const handleChangeSkills = (event) => {
    const {
      target: { value }
    } = event;
    setSkills(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSearch = async () => {
    let search = '';
    if (workLocation) {
      search += `&work-location=${workLocation}`;
    }
    if (skills?.length) {
      search += `&skills=${skills}`;
    }
    if (salary) {
      search += `&salary=${salary}`;
    }
    if (location.pathname !== '/search') {
      navigate(`/search${search ? '?' + search : ''}`);
    } else {
      navigate(`/search${search ? '?' + search : ''}`);
      onSearch(skills, workLocation, salary);
    }
  };
  return (
    <Box
      // component="form"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
        alignItems: 'center',
        '& .MuiOutlinedInput-input': {
          bgcolor: 'transparent',
          borderColor: '#000',
          borderWidth: '3px',
          color: '#000',
          '&:hover': {
            borderColor: '#000'
          }
        },
        '& .MuiInputLabel-shrink': {
          color: '#000'
        },
        marginTop: 3
      }}
    >
      <FormControl variant="outlined" sx={{ minWidth: 220, maxWidth: 250 }}>
        <InputLabel id="multiple-skills-label">Skills</InputLabel>
        <Select
          labelId="multiple-skills-label"
          id="multiple-skills-label"
          multiple
          value={skills}
          onChange={handleChangeSkills}
          input={<OutlinedInput label="Skills" />}
          MenuProps={MenuProps}
        >
          {SKILLS.map((skill) => (
            <MenuItem key={skill} value={skill} style={getStyles(skill, skills, theme)}>
              {skill}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl variant="outlined" sx={{ minWidth: 145 }}>
        <InputLabel id="select-work-location-label">Work Location</InputLabel>
        <Select
          labelId="select-work-location-label"
          id="select-work-location"
          onChange={(e) => {
            setWorkLocation(e.target.value);
          }}
          autoWidth
          label="Work Location"
          value={workLocation}
        >
          {JOB_LOCATION.map((jobLocation) => (
            <MenuItem key={jobLocation} value={jobLocation}>
              {jobLocation}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box
        sx={{
          width: 120
        }}
      >
        <TextField
          variant="outlined"
          label="Salary"
          name="salary"
          sx={{ flex: 1 }}
          type="number"
          onChange={(e) => {
            setSalary(parseInt(e.target.value));
          }}
          value={salary}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Tìm kiếm
      </Button>
    </Box>
  );
};
export default FormSearchJob;
