// @flow

import {
  IO_CONNECT,
  IO_DISCONNECT,
  IO_CLIENT_JOIN_ROOM,
  IO_CLIENT_HELLO,
  IO_SERVER_HELLO,
  IO_CREATE_USER,
} from '../shared/config'

import createUser from './controller'

/* eslint-disable no-console */
const setUpSocket = (io: Object) => {
  // when client connects get access to socket object
  io.on(IO_CONNECT, (socket) => {
    console.log('[socket.io] A client connected.')

    // make client join the room it wants
    socket.on(IO_CLIENT_JOIN_ROOM, (room) => {
      socket.join(room)
      console.log(`[socket.io] A client joined room ${room}.`)

      io.emit(IO_SERVER_HELLO, 'Hello everyone!')
      io.to(room).emit(IO_SERVER_HELLO, `Hello clients of room ${room}!`)
      socket.emit(IO_SERVER_HELLO, 'Hello you!')
    })

    // log message in server console
    socket.on(IO_CLIENT_HELLO, (clientMessage) => {
      console.log(`[socket.io] Client: ${clientMessage}`)
    })

    // log disconnections
    socket.on(IO_DISCONNECT, () => {
      console.log('[socket.io] A client disconnected.')
    })

    // create a user in the database
    socket.on(IO_CREATE_USER, (user) => {
      console.log('[socket.io] A user has been registered.')
      createUser(user.userName, user.email, user.password)
    })
  })
}
/* eslint-enable no-console */

export default setUpSocket
