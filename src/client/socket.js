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
  SOCKET_PATH,
} from '../shared/config'

import * as actions from '../shared/action/actions'

// const socket = socketIOClient(window.location.host)
let socket = null

export function sessionMiddleware({ getState }) {
  return next => (action) => {
    if (socket) {
      // console.log('middleware works!', getState())
      // check action types
      switch (action.type) {
        default:
          break
        case actions.JOIN_ROOM:
          socket.emit(IO_CLIENT_JOIN_ROOM, {
            roomID: action.roomID,
            username: action.username,
          })
          break
        case actions.CREATE_ROOM:
          socket.emit(IO_CLIENT_JOIN_ROOM, {
            roomID: action.roomID,
            username: action.hostName,
          })
          break
        case actions.BEGIN_BRAINSTORM:
          socket.emit('begin_brainstorm', {
            brainstormTimeLimit: action.brainstormSeconds,
            deliberationTimeLimit: action.deliberationSeconds,
            roomID: action.roomID,
          })
          break

        case actions.VOTE_IDEA:
          socket.emit('vote_made', {
            ideaVoted: action.idea,
            userVoted: action.user,
            roomID: action.roomID,
          })
          break
        case actions.LOG_IN:
          // emitting a socket event to check login credentials
          if (action.login_type === 'login') {
            // emitting a socket event to check login credentials
            socket.emit('log_in', {
              Username: action.name,
              Password: action.pass,
            })
          } else if (action.login_type === 'signup') {
            // emitting a socket event to register a user
            socket.emit('create_user', {
              Username: action.name,
              Password: action.pass,
            })
          } else {
            socket.emit('create_guest_user', {
              Username: action.name,
            })
          }
          break
      }
    }
    return next(action)
  }
}

/* eslint-disable no-console */
// eslint-disable-next-line no-unused-vars
export const setUpSocket = (store: Object) => {
  socket = io()

  socket.on(IO_USER_JOIN_ROOM, (payload) => {
    console.log(`${payload.username} joined your room.`)

    if (payload.socketID !== socket.id) {
      store.dispatch(actions.addMember(payload.username))

      // if host, broadcast state to the rest of the users
      const state = store.getState()
      console.log(state.hello.get('session').get('members'))
      // comparing usernames is very shitty if two users sign up with the same name
      if (state.hello.get('user').get('name') === state.hello.get('session').get('host')) {
        socket.emit(IO_USER_JOIN_ROOM, {
          roomID: state.hello.get('session').get('roomID'),
          host: state.hello.get('session').get('host'),
          members: state.hello.get('session').get('members'),
          topic: state.hello.get('session').get('topic'),
          phase: state.hello.get('session').get('phase'),
        })
      }
    }
  })

  socket.on('load_brainstorm_room', (payload) => {
    // if host, broadcast state to the rest of the users
    const state = store.getState()
    if (state.hello.get('user').get('name') !== state.hello.get('session').get('host')) {
      store.dispatch(actions.moveToBrainstorm(
        payload.brainstormTimeLimit,
        payload.deliberationTimeLimit,
        payload.roomID,
      ))
    }
  })

  socket.on('load_deliberation_room', (payload) => {
    console.log('IDEAS: ', payload.ideasToRender)
    const state = store.getState()
    // store.dispatch(actions.resetVotes())
    // console.log(state.hello.get('session').get('ideas').points)
    store.dispatch(actions.beginDeliberations(payload.ideasToRender))
    if (state.hello.get('user').get('name') === state.hello.get('session').get('host')) {
      const deliberationTime = state.hello.get('session').get('deliberationSeconds')
      const room = state.hello.get('session').get('roomID')
      socket.emit('begin_deliberations', {
        deliberationTimeLeft: deliberationTime,
        roomID: room,
      })
    }
  })

  socket.on('update_brainstorm_timer', (payload) => {
    store.dispatch(actions.setBrainstormTime(payload.brainStormTimeLeft))
  })

  socket.on('update_deliberation_timer', (payload) => {
    store.dispatch(actions.setDeliberationTime(payload.deliberationTimeLeft))
  })

  socket.on('collect_ideas', () => {
    const state = store.getState()
    const ideasToSend = state.hello.get('session').get('ideas')
    const userName = state.hello.get('user').get('name')
    const room = state.hello.get('session').get('roomID')
    socket.emit('send_ideas', {
      userIdeas: ideasToSend,
      username: userName,
      roomID: room,
    })
  })

  socket.on('update_votes', (payload) => {
    const ideaToVote = payload.idea
    const userWhoVotes = payload.user
    store.dispatch(actions.updateVotedIdea(ideaToVote, userWhoVotes))
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
