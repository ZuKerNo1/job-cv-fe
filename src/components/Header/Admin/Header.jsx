import styles from './Header.module.css';
import Profile from './Profile';

const Header = ({ title }) => {
  return (
    <header className={styles.header}>
      <div className={styles.header_left}>
        <button className={styles.toggle_menu}>
          <i className="fas fa-bars" />
        </button>
        <h2>{title}</h2>
      </div>
      <div className={styles.header_right}>
        <Profile />
      </div>
    </header>
  );
};
export default Header;
