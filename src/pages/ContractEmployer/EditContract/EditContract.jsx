import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { editContractAPI, getContractDetailsByEmpAPI } from '../../../apis';
import TinyMCEEditor from '../../../components/TinyMCEEditor/TinyMCEEditor';
import FieldErrorAlert from '../../../components/Form/FieldErrorAlert';
import { useEffect, useState } from 'react';
import Header from '../../../components/Header/Admin/Header';
import { useNavigate, useParams } from 'react-router-dom';
const EditContractEmp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {}
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const submitContract = async (data) => {
    toast.promise(editContractAPI(id, data), {
      pending: 'Đang chỉnh sửa...',
      success: {
        render() {
          navigate('/employer/contract');
          return 'Thay đổi thành công !';
        }
      }
    });
  };
  const [contract, setContract] = useState(null);
  useEffect(() => {
    getContractDetailsByEmpAPI().then((data) => {
      setContract(data);
    });
  }, []);

  return (
    <Box>
      <Header title={'Chỉnh sửa hợp đồng'} />
      <Box
        sx={{
          padding: 3,
          borderRadius: '20px',
          p: 3,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          bgcolor: 'white'
        }}
        component="form"
        onSubmit={handleSubmit(submitContract)}
      >
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            Chỉnh sửa hợp đồng
          </Typography>
        </Box>
        {contract && (
          <TinyMCEEditor
            control={control}
            name={'description'}
            initialValue={contract.description}
          />
        )}
        <FieldErrorAlert errors={errors} fieldName={'description'} />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            m: 2
          }}
        >
          <Button variant="outlined" type="submit">
            Chỉnh sửa
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default EditContractEmp;
