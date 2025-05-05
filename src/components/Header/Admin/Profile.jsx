import { Avatar } from '@mui/material';
import styles from './Header.module.css';
import React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { logOutUserAPI } from '../../../redux/User/userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const dispatch = useDispatch();

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    toast
      .promise(dispatch(logOutUserAPI()), {
        pending: 'Loading loggout...'
      })
      .then((res) => {
        if (!res.error) {
          toast.success('logout successs !');
          navigate('/login');
        }
      });
  };
  return (
    <div className={styles.admin_profile}>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          padding: 0,
          display: 'flex',
          gap: 1,
          '&.MuiIconButton-root:hover': {
            background: 'transparent'
          }
        }}
      >
        <div className={styles.admin_avatar}>
          <Avatar
            src="https://secure.gravatar.com/avatar/937cf88e7bdde6ee98baab36dca91677?s=32&d=https%3A%2F%2Fblog.postman.com%2Fwp-content%2Fuploads%2F2021%2F11%2Favatars-04.png&r=g"
            sx={{ width: 34, height: 34 }}
          />
        </div>
        <div className="admin-info">
          <div style={{ fontWeight: 500 }}>Admin</div>
          <div style={{ fontSize: 12, color: '#666' }}>Super Admin</div>
        </div>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Link to="/profile">
          <MenuItem
            sx={{
              color: '#000000DE'
            }}
          >
            <Avatar /> Profile
          </MenuItem>
        </Link>

        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>

        <MenuItem
          onClick={handleLogOut}
          sx={{
            '&:hover': {
              color: 'warning.dark',
              '& .button_logout': {
                color: 'warning.dark'
              }
            }
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" className="button_logout" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
export default Profile;
