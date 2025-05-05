import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/User/userSlice';
import Profile from './Menus/Profile';
import { ROLE_USER } from '../../../utils/constants';
import { Box } from '@mui/material';
const Header = () => {
  const currentUser = useSelector(selectCurrentUser);
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          <i className="fas fa-briefcase" />
          JobPortal
        </Link>
        <div className={styles.nav_links}>
          {currentUser == null ? (
            <>
              <Link to="/login">
                <i className="fas fa-sign-in-alt" /> Đăng nhập
              </Link>
              <Link to="/register">
                <i className="fas fa-user-plus" /> Đăng ký
              </Link>
            </>
          ) : (
            <Box
              sx={{
                display: 'flex',
                gap: 1
              }}
            >
              {(currentUser.role === ROLE_USER.JOB_SEEKER ||
                currentUser.role === ROLE_USER.INTERVIEER) && (
                <Box
                  sx={{
                    display: 'flex'
                  }}
                >
                  {currentUser.role === ROLE_USER.JOB_SEEKER && (
                    <Link to="/applied-jobs">
                      <i className="fas fa-building" /> Việc làm đã ứng tuyển
                    </Link>
                  )}
                  <Link to="/chat">
                    <i className="fa-solid fa-comments"></i> Chat
                  </Link>
                </Box>
              )}
              <Profile user={currentUser} />
            </Box>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Header;
