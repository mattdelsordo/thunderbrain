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
  BEGIN_BRAINSTORM,
  BEGIN_DELIBERATIONS,
  VOTE_IDEA,
  UNVOTE_IDEA, SET_BRAINSTORM_TIME, SET_DELIBERATION_TIME, ADD_MEMBER, REFRESH_USER_JOINED, MOVE_TO_BRAINSTORM,
  RESET_VOTES,
} from '../action/actions'

const initialState = Immutable.fromJS({
  // message: 'Initial reducer message',
  // messageAsync: 'Initial reducer message for async call',
  user: null,
  session: null,
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
        roomID: action.roomID,
        host: action.hostName,
        topic: action.topic,
        members: [action.hostName],
        ideas: [],
        phase: action.phase,
      })
    case JOIN_ROOM:
      return Immutable.fromJS({
        roomID: action.roomID,
        host: '???',
        topic: '???',
        members: [action.username],
        ideas: [],
        phase: action.phase,
      })
    case LEAVE_ROOM:
      return null
    case ADD_IDEA:
      return state.set('ideas', [
        ...state.get('ideas'),
        {
          text: action.text,
          points: [],
          userDidVote: false,
        },
      ])
    case BEGIN_BRAINSTORM:
      return state.merge({
        brainstormSeconds: action.brainstormSeconds,
        deliberationSeconds: action.deliberationSeconds,
        phase: action.phase,
      })
    case MOVE_TO_BRAINSTORM:
      return state.merge({
        brainstormSeconds: action.brainstormSeconds,
        deliberationSeconds: action.deliberationSeconds,
        phase: action.phase,
      })
    case BEGIN_DELIBERATIONS:
      return state.merge({
        phase: action.phase,
        ideas: action.ideas,
      })
    case RESET_VOTES:
      return state.set('ideas', state.get('ideas').map(idea => ({
        text: idea.text,
        points: [],
        userDidVote: idea.userDidVote,
      })))
    case VOTE_IDEA:
      return state.set('ideas', state.get('ideas').map((idea) => {
        if (idea.get('text') === action.idea) {
          // add point to idea
          if (idea.get('userDidVote') === false) {
            return Immutable.fromJS({
              text: idea.get('text'),
              points: idea.get('points').push(action.user),
              userDidVote: true,
            })
          // remove point from idea
          } else if (idea.get('userDidVote') === true) {
            return Immutable.fromJS({
              text: idea.get('text'),
              points: idea.get('points').filter(user => user !== action.user),
              userDidVote: false,
            })
          }
        }
        return idea
      }))
    case SET_BRAINSTORM_TIME:
      return state.set('brainstormSeconds', action.newTime)
    case SET_DELIBERATION_TIME:
      return state.set('deliberationSeconds', action.newTime)
    case LOG_OUT:
      return null
    case ADD_MEMBER:
      return state.set('members', [
        ...state.get('members'),
        action.member,
      ])
    case REFRESH_USER_JOINED:
      return state.merge({
        host: action.host,
        members: action.members,
        topic: action.topic,
        phase: action.phase,
      })
    default:
      return state
  }
}

const AppReducer = (state: Immut = initialState, action: { type: string, payload: any }) => Immutable.fromJS({
  user: userReducer(state.get('user'), action),
  session: sessionReducer(state.get('session'), action),
})

export default AppReducer
