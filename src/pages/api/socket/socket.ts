import { NextApiRequest, NextApiResponse } from 'next'
import { Server } from 'socket.io'

const SocketHandler = (req: NextApiRequest, res: NextApiResponse | any) => {
  // check for a connection
  if (res.socket.server.io) {
    console.log('Ooops.. Socket is already running..')
  // if not, setup connection
  } else {
    const io = new Server(res.socket.server)
    console.log('Initializing... Socket is running..')

    io.on('connection', (socket) => {
      // defining rider check-in events
      socket.on("new-rider_check-in", (data) => {
        socket.broadcast.emit("new-rider_check-in", data);
      })
      // defining [all riders]  events
      socket.on("all-riders", (data) => {
        socket.broadcast.emit("all-riders", data);
      })
      // defining current rider events
      socket.on("current-rider", (data) => {
        socket.broadcast.emit("current-rider", data);
      })
      // defining position change events
      socket.on("position-change", (data) => {
        socket.broadcast.emit("position-change", data);
      })
    })
    
    res.socket.server.io = io
  }

  res.end();
}

export default SocketHandler;