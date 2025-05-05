import { Link, Outlet } from 'react-router-dom';
import styles from '../../../styles/Chat.module.css';
import UserChat from './UserChat/UserChat';
import { useEffect, useState } from 'react';
import { getListUserChatAPI } from '../../../apis';
import { Box } from '@mui/material';
const ChatLayout = () => {
  const [listUserChat, setListUserChat] = useState(null);
  useEffect(() => {
    getListUserChatAPI().then((data) => {
      setListUserChat(data);
    });
  }, []);
  return (
    <div className={styles.chat_container}>
      <div className={styles.contacts_sidebar}>
        <div className={styles.contacts_header}>
          <div className={styles.title}>Message Together</div>
        </div>
        <div className={styles.contacts_list}>
          {listUserChat &&
            listUserChat.map((userChat) => (
              <Link key={userChat._id} to={`/chat/${userChat._id}`}>
                <Box
                  sx={{
                    color: '#000'
                  }}
                >
                  <UserChat username={userChat.infoUser.username} />
                </Box>
              </Link>
            ))}
        </div>
      </div>
      <Outlet />
    </div>
  );
};
export default ChatLayout;
