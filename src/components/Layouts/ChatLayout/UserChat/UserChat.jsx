import styles from '../../../../styles/Chat.module.css';
import { capitalizeFirstLetter } from '../../../../utils/formatters';
const UserChat = ({ username }) => {
  return (
    <div className={styles.contact_item}>
      <div className={styles.contact_avatar}>T</div>
      <div className={styles.contact_info}>
        <div className={styles.contact_name}>{capitalizeFirstLetter(username)}</div>
      </div>
    </div>
  );
};
export default UserChat;
