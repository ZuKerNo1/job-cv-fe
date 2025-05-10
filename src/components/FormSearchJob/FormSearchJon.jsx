import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Checkbox,
  ListItemText
} from '@mui/material';
import { useState, useEffect } from 'react';
import { JOB_LOCATION } from '../../utils/constants';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { getListJobType } from '../../apis';
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

const FormSearchJob = ({ onSearch }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [workLocation, setWorkLocation] = useState(searchParams.get('work-location') || '');
  const [idCategories, setIdCategories] = useState(
    searchParams.get('idCategory')?.split(',') || []
  );
  const [salary, setSalary] = useState(searchParams.get('salary') || '');
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || '');
  const [jobTypes, setJobTypes] = useState([]);

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

  const handleSearch = async () => {
    let search = '';
    if (workLocation) {
      search += `&work-location=${workLocation}`;
    }
    if (idCategories.length > 0) {
      search += `&idCategory=${idCategories.join(',')}`;
    }
    if (salary) {
      search += `&salary=${salary}`;
    }
    if (keyword) {
      search += `&keyword=${keyword}`;
    }
    if (location.pathname !== '/search') {
      navigate(`/search${search ? '?' + search.substring(1) : ''}`);
    } else {
      navigate(`/search${search ? '?' + search.substring(1) : ''}`);
      onSearch(idCategories, workLocation, salary, keyword);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
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
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
          alignItems: 'center'
        }}
      >
        <FormControl variant="outlined" sx={{ minWidth: 220, maxWidth: 250 }}>
          <InputLabel id="job-type-label">Loại công việc</InputLabel>
          <Select
            labelId="job-type-label"
            id="job-type"
            multiple
            value={idCategories}
            onChange={(e) => setIdCategories(e.target.value)}
            input={<OutlinedInput label="Loại công việc" />}
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
                <Checkbox checked={idCategories.indexOf(type._id) > -1} />
                <ListItemText primary={type.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" sx={{ minWidth: 145 }}>
          <InputLabel id="select-work-location-label">Nơi làm việc</InputLabel>
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
        <Box sx={{ width: 120 }}>
          <TextField
            variant="outlined"
            label="Mức lương"
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
      <TextField
        variant="outlined"
        label="Phúc lợi mong muốn"
        name="keyword"
        sx={{
          width: 517,
          '& .MuiOutlinedInput-input': {
            bgcolor: 'transparent',
            borderColor: '#3d3d3d',
            borderWidth: '1px',
            color: '#000'
          }
        }}
        type="text"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
        value={keyword}
      />
    </Box>
  );
};
export default FormSearchJob;
