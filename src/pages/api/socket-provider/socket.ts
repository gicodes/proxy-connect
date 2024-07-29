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

    const io = new Server(res.socket.server, {
      cors: {
        origin: process.env.LOCAL_URL,
        methods: ["GET", "POST"]
      }
    })
      
    console.log('Server-- Socket-connect initializing...')

    io.on('connection', (socket) => {
      console.log(`Server-- Socket ${socket.id} connected..`)

      socket.on("all-users", (data) => {
        console.log(`Server-- All users..`)
        io.emit("all-users", data); 
        socket.broadcast.emit('Proxy fam, what do you need today?', data)       
      })

      socket.on("current-user", (data) => {
        console.log(`Server-- Current user..`)
        io.emit("current-user", data);
      })

      socket.on("new-user", (data) => {
        console.log(`Server-- New user..`)
        io.emit("new-user", data);
      })
      
      socket.on("join-individuals", (data) => {
        console.log(`Server-- Join individuals..`)
        io.emit("join-individuals", data)
      })

      socket.on("join-business", (data) => {
        console.log(`Server-- Join business..`)
        io.emit("join-business", data)
      })

      socket.on("get-distancee", (data) => {
        console.log(`Server--Get distance..`)
        io.emit("get-distance", (data))
      })

      socket.on("position-change", (data) => {
        console.log(`Server--Position change..`)
        io.emit("position-change", data);
      })
    })

    res.socket.server.io = io
  }

  res.end();
}