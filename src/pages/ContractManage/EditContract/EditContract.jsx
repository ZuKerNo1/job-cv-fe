import Box from '@mui/material/Box';
import Header from '../../../components/Header/Admin/Header';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import FormControl from '@mui/material/FormControl';
import { Controller, useForm } from 'react-hook-form';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { FIELD_REQUIRED_MESSAGE } from '../../../utils/validators';
import Select from '@mui/material/Select';
import { STATUS } from '../../../utils/constants';
import { statusName } from '../../../utils/formatters';
import FieldErrorAlert from '../../../components/Form/FieldErrorAlert';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { changeStatusContractAPI, getContractDetailsAPI } from '../../../apis';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const EditContract = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [contract, setContract] = useState(null);
  useEffect(() => {
    getContractDetailsAPI(id)
      .then((data) => {
        setContract(data);
      })
      .catch(() => {
        navigate('/*');
      });
  }, [id, navigate]);
  const changeStatusContract = (data) => {
    toast.promise(changeStatusContractAPI(id, data.status), {
      pending: 'Thay đổi yêu cầu ....',
      success: {
        render() {
          navigate('/admin/contracts');
          return 'Thay đổi thành công !';
        }
      }
    });
  };
  return (
    <Box>
      <Header title={'Phê duyệt hợp đồng'} />
      {contract ? (
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            borderRadius: '20px',
            p: 3,
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 3
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', m: 0 }}>
              Thông tin chi tiết
            </Typography>
            <Button variant="outlined" onClick={handleSubmit(changeStatusContract)}>
              Lưu thay đổi
            </Button>
          </Box>
          <Box sx={{ marginBottom: 4 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              <strong>Created At:</strong> {new Date(contract.createdAt).toLocaleString()}
            </Typography>

            <Typography variant="body" sx={{ marginBottom: 2 }}>
              <strong>Description:</strong>
              <div dangerouslySetInnerHTML={{ __html: contract.description }}></div>
            </Typography>
          </Box>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', marginBottom: 3 }}>
            Thông tin người tạo
          </Typography>
          <Box>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              <strong>Company Name:</strong> {contract.creatorInfo.companyName}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              <strong>Email:</strong> {contract.creatorInfo.email}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              <strong>Role:</strong> {contract.creatorInfo.role}
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              <strong>Username:</strong> {contract.creatorInfo.username}
            </Typography>
            <Box>
              <Typography variant="h6" sx={{ marginBottom: 2 }}>
                <strong>Status:</strong> {contract.status}
              </Typography>
              <Box sx={{ marginBottom: '1em' }}>
                <FormControl sx={{ minWidth: 120 }}>
                  <InputLabel>Trạng thái tài khoản :</InputLabel>
                  <Controller
                    name="status"
                    control={control}
                    defaultValue={contract.status}
                    rules={{ required: FIELD_REQUIRED_MESSAGE }}
                    render={({ field }) => (
                      <Select label="Trạng thái công việc :" {...field} size="small">
                        <MenuItem value={STATUS.ACTIVE}>{statusName(STATUS.ACTIVE)}</MenuItem>
                        <MenuItem value={STATUS.PENDING}>{statusName(STATUS.PENDING)}</MenuItem>
                        <MenuItem value={STATUS.REJECT}>{statusName(STATUS.REJECT)}</MenuItem>
                      </Select>
                    )}
                  />
                  <FieldErrorAlert errors={errors} fieldName={'status'} />
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Paper>
      ) : (
        <></>
      )}
    </Box>
  );
};
export default EditContract;
