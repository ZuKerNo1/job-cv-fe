import NavItem from '../NavItem/NavItem';
import styles from '../SideBar.module.css';
const SideBarInterview = ({ customCssLink }) => {
  return (
    <ul className={styles.nav_menu}>
      <NavItem
        link={'/interviewer/list-candidates'}
        customCssLink={customCssLink}
        icon={'fa-solid fa-users'}
        title={'Danh sách ứng viên'}
      />
      <NavItem
        link={'/interviewer/scheduals'}
        customCssLink={customCssLink}
        icon={'fa-solid fa-calendar-days'}
        title={'Lịch phỏng vấn'}
      />
      <NavItem
        link={'/interviewer/reviews'}
        customCssLink={customCssLink}
        icon={'fa-solid fa-file-lines'}
        title={'Bài đánh giá ứng viên'}
      />
    </ul>
  );
};
export default SideBarInterview;
