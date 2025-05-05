import styles from '../../../styles/Chat.module.css';
const HeaderChat = ({ infoUser }) => {
  return (
    <div className={styles.chat_header}>
      <div className={styles.chat_user_info}>
        <div className={styles.contact_avatar}>T</div>
        <div>
          <h3>{infoUser.username}</h3>
        </div>
      </div>
    </div>
  );
};
export default HeaderChat;
