import type { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';

export default function handler(
  req: NextApiRequest, 
  res: NextApiResponse | any, 
  ) {
  if (req.method === "GET"){
    console.log("Server CL: I'm here to avoid any polling.js error!")
  }

  // init connection flow
  if (!res.socket.server.io) {
    console.log('Server CL: Hi G-nis, Socket is not yet running..')

    const io = new Server(res.socket.server)
    console.log('Server CL: Initializing... Socket is running..')

    io.on('connection', (socket) => {
      console.log(`Server CL: Socket ${socket.id} connected.`)

      // defining rider check-in events
      socket.on("new-rider", (data) => {
        io.emit("new-rider_check-in", data);
        console.log(`Server CL: new rider ${data} check-in.`)
      })

      // defining [all riders]  events
      socket.on("all-riders", (data) => {
        io.emit("all-riders", data);        
        console.log(`Server CL: all riders ${data} emitted.`)
      })

      // defining current rider events
      socket.on("current-rider", (data) => {
        io.emit("current-rider", data);
        console.log(`Server CL: current rider ${data} set.`)
      })

      // defining position change events
      socket.on("position-change", (data) => {
        io.emit("position-change", data);
        console.log(`Server CL: position change ${data} record.`)
      })
    })
    res.socket.server.io = io
  }

  res.end();
}