// @flow

import 'isomorphic-fetch'

import { createAction } from 'redux-actions'
import { helloEndpointRoute } from '../../shared/routes'

// export const SAY_HELLO = 'SAY_HELLO'
// export const SAY_HELLO_ASYNC_REQUEST = 'SAY_HELLO_ASYNC_REQUEST'
// export const SAY_HELLO_ASYNC_SUCCESS = 'SAY_HELLO_ASYNC_SUCCESS'
// export const SAY_HELLO_ASYNC_FAILURE = 'SAY_HELLO_ASYNC_FAILURE'

// export const sayHello = createAction(SAY_HELLO)
// export const sayHelloAsyncRequest = createAction(SAY_HELLO_ASYNC_REQUEST)
// export const sayHelloAsyncSuccess = createAction(SAY_HELLO_ASYNC_SUCCESS)
// export const sayHelloAsyncFailure = createAction(SAY_HELLO_ASYNC_FAILURE)

// // returns a function which launches a fetch call which itself returns a Promise
// // which is used to dispatch different actions depending on the state of the call
// export const sayHelloAsync = (num: number) => (dispatch: Function) => {
//   dispatch(sayHelloAsyncRequest())
//   return fetch(helloEndpointRoute(num), { method: 'GET' })
//     .then((res) => {
//       if (!res.ok) throw Error(res.statusText)
//       return res.json()
//     })
//     .then((data) => {
//       if (!data.serverMessage) throw Error('No message received')
//       dispatch(sayHelloAsyncSuccess(data.serverMessage))
//     })
//     .catch(() => {
//       dispatch(sayHelloAsyncFailure())
//     })
// }

// Make user logged in
export const LOG_IN = 'LOG_IN'
export const logIn = name => ({
  type: LOG_IN,
  name,
})

// Make user logged out
export const LOG_OUT = 'LOG_OUT'
export const logOut = () => ({
  type: LOG_OUT,
})

// Create a new room
export const CREATE_ROOM = 'CREATE_ROOM'
export const createRoom = (roomID, hostName, topic) => ({
  type: CREATE_ROOM,
  roomID,
  hostName,
  topic,
})

// Join a room
export const JOIN_ROOM = 'JOIN_ROOM'
export const joinRoom = (roomID, hostName, topic, members) => ({
  type: JOIN_ROOM,
  roomID,
  hostName,
  topic,
  members,
})

// leave your room
export const LEAVE_ROOM = 'LEAVE_ROOM'
export const leaveRoom = () => ({
  type: LEAVE_ROOM,
})

// Add idea to idea list during brainstorm
export const ADD_IDEA = 'ADD_IDEA'
export const addIdea = text => ({
  type: ADD_IDEA,
  text,
})
