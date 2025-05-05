import { useLocation } from 'react-router-dom';
import styles from './SideBar.module.css';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../redux/User/userSlice';
import { ROLE_USER } from '../../utils/constants';
import SideBarAdmin from './SideBarAdmin/SideBarAdmin';
import SideBarEmployer from './SideBarEmployer/SideBarEmployer';
import SideBarInterview from './SideBarInterview/SideBarInterview';
const SideBar = () => {
  const location = useLocation();
  const currentUser = useSelector(selectCurrentUser);

  const customCssLink = (linkActive) => {
    if (location.pathname.includes(linkActive)) {
      return `${styles.nav_link} ${styles.active}`;
    } else {
      return `${styles.nav_link}`;
    }
  };
  return (
    <nav className={styles.sidebar}>
      <div className={styles.sidebar_header}>
        <div className={styles.logo}>
          <i className="fas fa-briefcase" />
          JobPortal {currentUser?.role === ROLE_USER.ADMIN && 'Admin'}{' '}
          {currentUser?.role === ROLE_USER.INTERVIEER && 'Interview'}
          {currentUser?.role === ROLE_USER.EMPLOYER && 'Employer'}
        </div>
      </div>

      {currentUser?.role === ROLE_USER.ADMIN && <SideBarAdmin customCssLink={customCssLink} />}
      {currentUser?.role === ROLE_USER.EMPLOYER && (
        <SideBarEmployer customCssLink={customCssLink} />
      )}
      {currentUser?.role === ROLE_USER.INTERVIEER && (
        <SideBarInterview customCssLink={customCssLink} />
      )}
    </nav>
  );
};
export default SideBar;
