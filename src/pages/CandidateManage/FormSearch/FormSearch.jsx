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
import { SKILLS } from '../../../utils/constants';
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
const FormSearch = ({ onReload }) => {
  const theme = useTheme();
  const [skills, setSkills] = useState([]);
  const [expensive, setExpensive] = useState('');
  const [desiredSalary, setDesiredSalary] = useState('');
  const [education, setEducation] = useState('');
  const handleChangeSkills = (event) => {
    const {
      target: { value }
    } = event;
    setSkills(typeof value === 'string' ? value.split(',') : value);
  };
  const handleSearch = async () => {
    let query = '';
    if (skills.length) {
      query += `skills=${skills.join(',')}&`;
    }
    if (expensive) {
      query += `expensive=${expensive}&`;
    }
    if (desiredSalary) {
      query += `desiredSalary=${desiredSalary}&`;
    }
    if (education) {
      query += `education=${education}`;
    }
    await onReload(query);
  };

  return (
    <Box
      sx={{
        mb: 2,
        display: 'flex',
        gap: 2
      }}
    >
      <FormControl variant="outlined" sx={{ minWidth: 220, maxWidth: 250 }}>
        <InputLabel id="multiple-skills-label" size="small">
          Skills
        </InputLabel>
        <Select
          labelId="multiple-skills-label"
          id="multiple-skills-label"
          multiple
          value={skills}
          onChange={handleChangeSkills}
          input={<OutlinedInput label="Skills" />}
          MenuProps={MenuProps}
          size="small"
        >
          {SKILLS.map((skill) => (
            <MenuItem key={skill} value={skill} style={getStyles(skill, skills, theme)}>
              {skill}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        type="txt"
        label="Education"
        sx={{ minWidth: 220, maxWidth: 250 }}
        size="small"
        value={education}
        onChange={(e) => {
          setEducation(e.target.value);
        }}
      />
      <TextField
        type="number"
        label="Expensive"
        sx={{ minWidth: 120, maxWidth: 120 }}
        size="small"
        value={expensive}
        onChange={(e) => {
          setExpensive(e.target.value);
        }}
      />
      <TextField
        type="number"
        label="Desired Salary"
        sx={{ minWidth: 150, maxWidth: 150 }}
        size="small"
        value={desiredSalary}
        onChange={(e) => {
          setDesiredSalary(e.target.value);
        }}
      />
      <Button variant="outlined" onClick={handleSearch}>
        Tìm kiếm
      </Button>
    </Box>
  );
};
export default FormSearch;
