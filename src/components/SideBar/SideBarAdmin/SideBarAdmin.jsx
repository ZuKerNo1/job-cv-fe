import NavItem from '../NavItem/NavItem';
import styles from '../SideBar.module.css';
const SideBarAdmin = ({ customCssLink }) => {
  return (
    <ul className={styles.nav_menu}>
      <NavItem
        link={'/admin/dash-board'}
        customCssLink={customCssLink}
        icon={'fas fa-home'}
        title={'DashBoard'}
      />
      <NavItem
        link={'/admin/users'}
        customCssLink={customCssLink}
        icon={'fas fa-users'}
        title={'Quản lý người dùng'}
      />
      <NavItem
        link={'/admin/job-types'}
        customCssLink={customCssLink}
        icon={'fas fa-users'}
        title={'Quản lý loại công việc'}
      />
      <NavItem
        link={'/admin/jobs'}
        customCssLink={customCssLink}
        icon={'fas fa-briefcase'}
        title={'Quản lý việc làm'}
      />
      <NavItem
        link={'/admin/contracts'}
        customCssLink={customCssLink}
        icon={'fas fa-file-alt'}
        title={'Quản lý hợp đồng'}
      />
      <NavItem
        link={'/admin/complains'}
        customCssLink={customCssLink}
        icon={'fas fa-exclamation-circle'}
        title={'Khiếu nại'}
      />
    </ul>
  );
};
export default SideBarAdmin;
