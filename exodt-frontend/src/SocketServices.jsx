import io from 'socket.io-client';
import { useEffect } from 'react';

let socket;
const SOCKET_URL = 'http://localhost:9000';

const SocketServices = () => {
  useEffect(() => {
    socket = io(SOCKET_URL);
    socket.on('command', (data) => {
      console.log(data);
    });
  }, []);

  return (
    <div>SocketService running</div>
  );
}

export default SocketServices;

const sendSocket = (data) => {
  socket.emit('command', {
    type: data.type,
    id: data.id,
    content: data.content,
  });
}