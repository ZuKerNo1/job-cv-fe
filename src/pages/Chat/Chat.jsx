import { useEffect, useState } from 'react';
import BoxChat from './BoxChat/BoxChat';
const Chat = () => {
  const [txt, setTxt] = useState('');
  useEffect(() => {
    if (txt != '') {
      setTxt('');
    }
  }, [txt]);
  return <BoxChat />;
};
export default Chat;
