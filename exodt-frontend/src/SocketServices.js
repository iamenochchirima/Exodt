import io from 'socket.io-client';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveChatData } from './redux/features/api/chatSlice';

let socket;
const SOCKET_URL = 'http://localhost:9000';

const SocketServices = () => {

  const dispatch = useDispatch();
  const {messageUserName} = useSelector((state) => state.chat)

  // useEffect(() => {
  //   socket = io(SOCKET_URL);
  //   socket.on('command', (data) => {
  //     if (messageUserName !== data.reciever) return;
  //     dispatch(setActiveChatData(data));
  //     console.log(data);
  //   });
  // }, [messageUserName]);

  return (
    <></>
  );
}

export default SocketServices;

export const sendSocket = (data) => {
  socket.emit('command', {
    type: data.type,
    id: data.id,
    content: data.content,
  });
}

export const sendTestSocket = (data) => {
  socket.emit('command', data);
}