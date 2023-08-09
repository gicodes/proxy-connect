import React, { useEffect } from 'react'
import { io } from 'socket.io-client';

let socket

export default function Socket(){
  useEffect(() => socketInitializer(), [])

  const socketInitializer: any = () => {
    fetch('/api/socket')
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })
  }

  return null
}
