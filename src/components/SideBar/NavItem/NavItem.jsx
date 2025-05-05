import { Link } from 'react-router-dom';
import styles from '../SideBar.module.css';
const NavItem = ({ customCssLink, link, icon, title }) => {
  return (
    <li className={styles.nav_item}>
      <Link to={link} className={customCssLink(link)}>
        <i className={icon} />
        {title}
      </Link>
    </li>
  );
};
export default NavItem;
