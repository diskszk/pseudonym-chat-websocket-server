import http from 'http';
import {Server, Socket} from 'socket.io';

const server = http.createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket: Socket) => {
  const socketId = socket.id;
  console.log('[connect] id: ', socketId);

  socket.on('join_to_room', (data: {clientId: string; roomId: string}) => {
    const roomId = data.roomId;
    const clientId = data.clientId;

    socket.join(roomId);
    console.log(
      `[join to room] socketId: ${socketId} clientId: ${clientId} roomId: ${roomId}`
    );

    // 1hで切断
    setInterval(() => {
      if (!socket.connected) {
        return;
      }
      socket.disconnect();
      console.log('connection close');
    }, 3600000);
  });

  // TODO: クライアントからのデータ受信

  // TODO: クライアントへのデータ配布

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
