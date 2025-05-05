import { useSelector } from 'react-redux';
import styles from '../../../styles/Chat.module.css';
import { selectCurrentUser } from '../../../redux/User/userSlice';
import { socketIoInstance } from '../../../../socketClient';
import { useParams } from 'react-router-dom';
const FormChat = ({ message, setMessage, setNewMessages }) => {
  const currentUser = useSelector(selectCurrentUser);
  const { id } = useParams();
  const handleSendMessage = () => {
    if (message != '') {
      const data = {
        userId: currentUser._id,
        content: message,
        createdAt: Date.now()
      };
      socketIoInstance.emit('CLIENT_SEND_MESSAGE', { id, data });
      setNewMessages((prevMessages) => [...prevMessages, data]);
      setMessage('');
    }
  };
  return (
    <div className={styles.chat_input_area}>
      <div className={styles.chat_input_container}>
        <input
          type="text"
          className={styles.chat_input}
          placeholder="Nhập tin nhắn..."
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyUp={(e) => {
            if (e.code === 'Enter') {
              handleSendMessage();
            }
          }}
        />
        <button className={styles.send_btn} onClick={handleSendMessage}>
          <i className="fas fa-paper-plane" />
        </button>
      </div>
    </div>
  );
};
export default FormChat;
