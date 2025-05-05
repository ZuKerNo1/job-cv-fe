import NavItem from '../NavItem/NavItem';
import styles from '../SideBar.module.css';
const SideBarEmployer = ({ customCssLink }) => {
  return (
    <ul className={styles.nav_menu}>
      <NavItem
        link={'/employer/dash-board'}
        customCssLink={customCssLink}
        icon={'fas fa-home'}
        title={'DashBoard'}
      />
      <NavItem
        link={'/employer/create-job'}
        customCssLink={customCssLink}
        icon={'fas fa-plus-circle'}
        title={'Đăng tin tuyển dụng'}
      />
      <NavItem
        link={'/employer/jobs'}
        customCssLink={customCssLink}
        icon={'fas fa-briefcase'}
        title={'Quản lý việc làm'}
      />
      <NavItem
        link={'/employer/candidates'}
        customCssLink={customCssLink}
        icon={'fa-solid fa-file'}
        title={'Đơn ứng tuyển'}
      />
      <NavItem
        link={'/employer/contract'}
        customCssLink={customCssLink}
        icon={'fas fa-file-alt'}
        title={'Hợp đồng'}
      />
    </ul>
  );
};
export default SideBarEmployer;
