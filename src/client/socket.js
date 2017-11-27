// @flow

// f-disable
import io from 'socket.io-client'

import {
  IO_CONNECT,
  IO_DISCONNECT,
  IO_CLIENT_HELLO,
  IO_CLIENT_JOIN_ROOM,
  IO_SERVER_HELLO,
  IO_CREATE_USER, IO_USER_JOIN_ROOM, IO_USER_JOIN_RESPONSE,
} from '../shared/config'

import * as actions from '../shared/action/actions'

// const socket = socketIOClient(window.location.host)
let socket = null

export const sessionMiddleware = (store) => {
  return next => (action) => {
    if (socket) {
      // check action types
      if (action.type === actions.JOIN_ROOM) {
        console.log('joined a room')
      }
    }
    return next(action)
  }
}

/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
export const setUpSocket = (store: Object) => {
  socket = io('http://localhost:8080')

  socket.on(IO_USER_JOIN_ROOM, (payload) => {
    store.dispatch(actions.ADD_MEMBER(payload.username))

    if (store.hello.get('user').get('name') === store.hello.get('session').get('host')) {
      socket.emit(IO_USER_JOIN_ROOM, {
        roomID: store.hello.get('session').get('roomID'),
        host: store.hello.get('session').get('host'),
        members: store.hello.get('session').get('memebers'),
        topic: store.hello.get('session').get('topic'),
        phase: store.hello.get('session').get('phase'),
      })
    }
  })

  socket.on(IO_USER_JOIN_RESPONSE, (payload) => {
    store.dispatch(actions.refreshUserJoined(payload))
  })

  socket.on(IO_CONNECT, () => {
    console.log('[socket.io] Connected.')
  })

  socket.on(IO_SERVER_HELLO, (serverMessage) => {
    console.log(`[socket.io] Server: ${serverMessage}`)
  })

  socket.on(IO_DISCONNECT, () => {
    console.log('Socket disconnected.')
  })
}
/* eslint-enable no-console */
