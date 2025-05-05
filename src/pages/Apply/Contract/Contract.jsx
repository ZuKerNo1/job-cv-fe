import { Box, Button, Typography } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import parse from 'html-react-parser';
import { useState } from 'react';

const Contract = ({ contract }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Button
        onClick={handleClickOpen}
        sx={{
          display: 'flex',
          gap: 0.5
        }}
        variant="outlined"
        size="small"
      >
        <i className="fa-solid fa-file-contract"></i> <span>Hợp đồng</span>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={'lg'}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Hợp đồng'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
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
              {parse(contract?.description)}
            </Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Contract;
