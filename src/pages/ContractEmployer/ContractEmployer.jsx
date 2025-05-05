import Box from '@mui/material/Box';
import Header from '../../components/Header/Admin/Header';
import parse from 'html-react-parser';
import { useEffect, useState } from 'react';
import { getContractDetailsByEmpAPI } from '../../apis';
import { Button, Typography } from '@mui/material';
import { STATUS } from '../../utils/constants';
import { convertDateTime } from '../../utils/formatters';
import CreateContract from './CreateContract/CreateContract';
import { Link } from 'react-router-dom';
const ContractEmployer = () => {
  const [contract, setContract] = useState(null);
  useEffect(() => {
    getContractDetailsByEmpAPI().then((data) => {
      setContract(data);
    });
  }, []);
  const convertStatus = (status) => {
    if (status === STATUS.PENDING) return 'Chờ phê duyệt';
    if (status === STATUS.ACTIVE) return 'Hợp đồng được phê duyệt';
    if (status === STATUS.REJECT) return 'Hợp đồng bị từ chối vui lòng chỉnh sửa lại hợp đồng';
  };
  return (
    <Box>
      <Header title={'Hợp đồng'} />
      <Box
        sx={{
          padding: 3,
          borderRadius: '20px',
          p: 3,
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          bgcolor: 'white'
        }}
      >
        {!contract ? (
          <CreateContract />
        ) : (
          <Box>
            <Box
              sx={{
                marginBottom: 4,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between'
              }}
            >
              <Box>
                <Typography variant="h6" sx={{ marginBottom: 1, fontSize: '1em' }}>
                  <strong>Created At:</strong> {convertDateTime(contract.createdAt)}
                </Typography>
                <Typography variant="h6" sx={{ marginBottom: 1, fontSize: '1em' }}>
                  <strong>Status:</strong> {convertStatus(contract.status)}
                </Typography>
              </Box>
              <Link to={`/employer/contract/edit/${contract._id}`}>
                <Button variant="outlined">Chỉnh sửa hợp đồng</Button>
              </Link>
            </Box>
            <Typography
              variant="body1"
              component="h2"
              gutterBottom
              sx={{
                '& ul': {
                  paddingLeft: '20px',
                  marginLeft: '20px'
                }
              }}
            >
              {parse(contract.description)}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
export default ContractEmployer;
