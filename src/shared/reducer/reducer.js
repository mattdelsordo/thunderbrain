// @flow

import Immutable from 'immutable'
import type { fromJS as Immut } from 'immutable'
import io from 'socket.io-client'

import {
  // SAY_HELLO,
  // SAY_HELLO_ASYNC_REQUEST,
  // SAY_HELLO_ASYNC_SUCCESS,
  // SAY_HELLO_ASYNC_FAILURE,
  LOG_IN,
  LOG_OUT,
  CREATE_ROOM,
  JOIN_ROOM,
  ADD_IDEA,
  LEAVE_ROOM,
} from '../action/actions'

const initialState = Immutable.fromJS({
  // message: 'Initial reducer message',
  // messageAsync: 'Initial reducer message for async call',
  user: null,
  session: null,
  socket: io('localhost:8080'),
})

const userReducer = (state, action) => {
  switch (action.type) {
    case LOG_IN:
      // only log in if you're currently logged out
      if (state == null) {
        return Immutable.fromJS({
          name: action.name,
          photoPath: null,
          pastCalls: [],
        })
      }
      return state
    case LOG_OUT:
      // only log out if you're currently logged in
      if (state != null) return null
      return state
    default:
      return state
  }
}

const sessionReducer = (state, action) => {
  switch (action.type) {
    case CREATE_ROOM:
      return Immutable.fromJS({
        id: action.roomID,
        host: action.hostName,
        topic: action.topic,
        members: [action.hostName],
        ideas: [],
      })
    case JOIN_ROOM:
      return Immutable.fromJS({
        id: action.roomID,
        host: action.hostName,
        topic: action.topic,
        members: action.members,
        ideas: [],
      })
    case LEAVE_ROOM:
      return null
    case ADD_IDEA:
      return state.set('ideas', [
        ...state.get('ideas'),
        {
          text: action.text,
          points: 0,
        },
      ])
    default:
      return state
  }
}

const AppReducer = (state: Immut = initialState, action: { type: string, payload: any }) => {
  return Immutable.fromJS({
    user: userReducer(state.get('user'), action),
    session: sessionReducer(state.get('session'), action),
  })
}

export default AppReducer
