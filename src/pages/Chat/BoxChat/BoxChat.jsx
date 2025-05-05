import { useNavigate, useParams } from 'react-router-dom';
import styles from '../../../styles/Chat.module.css';
import FormChat from './FormChat';
import HeaderChat from './HeaderChat';
import { useEffect, useRef, useState } from 'react';
import { getListMessageAPI, getRoomChatDetailsAPI } from '../../../apis';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../redux/User/userSlice';
import { convertTime } from '../../../utils/formatters';
import { socketIoInstance } from '../../../../socketClient';
const BoxChat = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [roomChat, setRoomChat] = useState(null);
  const [oldMessages, setOldMessages] = useState([]);
  const [newMessages, setNewMessages] = useState([]);
  const [message, setMessage] = useState('');
  const chatRef = useRef(null);
  useEffect(() => {
    getRoomChatDetailsAPI(id).then((data) => {
      setRoomChat(data);
    });
    getListMessageAPI(id)
      .then((data) => {
        setOldMessages(data);
      })
      .catch(() => {
        navigate('/*');
      });
  }, [id, navigate]);
  useEffect(() => {
    socketIoInstance.emit('joinRoom', id);
    socketIoInstance.on('SERVER_RETURN_MESSAGE', (data) => {
      setNewMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socketIoInstance.off('SERVER_RETURN_MESSAGE');
    };
  }, [id]);
  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [newMessages, roomChat]);

  const currentUser = useSelector(selectCurrentUser);
  return (
    <div className={styles.chat_area}>
      {roomChat && (
        <>
          <HeaderChat infoUser={roomChat.infoUser} />
          <div className={styles.messages_container} ref={chatRef}>
            {oldMessages.map((oldMessage) => {
              if (oldMessage.userId === currentUser._id) {
                return (
                  <div key={oldMessage._id} className={styles.message + ' ' + styles.sent}>
                    {oldMessage.content}
                    <div className={styles.message_time}>
                      {convertTime(oldMessage.createdAt)}
                      <span className={styles.message_status}>
                        <i className="fas fa-check-double" />
                      </span>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={oldMessage._id} className={styles.message + ' ' + styles.received}>
                    {oldMessage.content}
                    <div className={styles.message_time}>{convertTime(oldMessage.createdAt)}</div>
                  </div>
                );
              }
            })}
            {newMessages.map((newMessage, index) => {
              if (newMessage.userId === currentUser._id) {
                return (
                  <div key={index} className={styles.message + ' ' + styles.sent}>
                    {newMessage.content}
                    <div className={styles.message_time}>
                      {convertTime(newMessage.createdAt)}
                      <span className={styles.message_status}>
                        <i className="fas fa-check-double" />
                      </span>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div key={index} className={styles.message + ' ' + styles.received}>
                    {newMessage.content}
                    <div className={styles.message_time}>{convertTime(newMessage.createdAt)}</div>
                  </div>
                );
              }
            })}
          </div>
          <FormChat
            message={message}
            setMessage={setMessage}
            setNewMessages={setNewMessages}
            // newMessages={newMessages}
          />
        </>
      )}
    </div>
  );
};
export default BoxChat;
