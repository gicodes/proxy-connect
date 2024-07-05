import type { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';

export default function handler(
  req: NextApiRequest, 
  res: NextApiResponse | any, 
  ) {
  if (req.method === "GET"){
    console.error("Server-- I'm here to intercept any polling.js error!")
  }

  if (!res.socket.server.io) {
    console.error('Server-- Sorry... Socket is not yet running..')

    const io = new Server(res.socket.server)
      console.log('Server-- Socket-connect initializing...')

    io.on('connection', (socket) => {
      console.log(`Server-- Socket ${socket.id} connected..`)

      socket.on("all-users", (data) => {
        io.emit("all-users", data);        
      })

      socket.on("new-user", (data) => {
        io.emit("new-user", data);
      })

      socket.on("current-user", (data) => {
        io.emit("current-user", data);
      })

      socket.on("join-individuals", (data) => {
        io.emit("join-individuals", data)
      })

      socket.on("join-business", (data) => {
        io.emit("join-business", data)
      })

      socket.on("get-distancee", (data) => {
        io.emit("get-distance", (data))
      })

      socket.on("position-change", (data) => {
        io.emit("position-change", data);
      })
    })

    res.socket.server.io = io
  }

  res.end();
}