// @flow

import 'isomorphic-fetch'
import {
  LOBBY,
  BRAINSTORM,
  DELIBERATION,
  RESULTS,
} from '../phases'

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
  phase: LOBBY,
})

// Join a room
export const JOIN_ROOM = 'JOIN_ROOM'
export const joinRoom = (roomID, username) => ({
  type: JOIN_ROOM,
  username,
  roomID,
  phase: LOBBY,
})

export const ADD_MEMBER = 'ADD_MEMBER'
export const addMember = member => ({
  type: ADD_MEMBER,
  member,
})

export const REFRESH_USER_JOINED = 'REFRESH_USER_JOINED'
export const refreshUserJoined = payload => ({
  type: REFRESH_USER_JOINED,
  host: payload.host,
  members: payload.members,
  topic: payload.topic,
  phase: payload.phase,
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

// Begins the room brainstorming phase
export const BEGIN_BRAINSTORM = 'BEGIN_BRAINSTORMING'
export const beginBrainstorm = (brainstormSeconds, deliberationSeconds) => ({
  type: BEGIN_BRAINSTORM,
  brainstormSeconds,
  deliberationSeconds,
  phase: BRAINSTORM,
})

// Begins deliberations
export const BEGIN_DELIBERATIONS = 'BEGIN_DELIBERATIONS'
export const beginDeliberations = () => ({
  type: BEGIN_DELIBERATIONS,
  phase: DELIBERATION,
})

// Idea voting actions
export const VOTE_IDEA = 'VOTE_IDEA'
export const voteIdea = (idea, user) => ({
  type: VOTE_IDEA,
  idea,
  user,
})

export const SET_DELIB_TIME = 'SET_DELIBERATION_TIME'
export const setDelibTime = newTime => ({
  type: SET_DELIB_TIME,
  newTime,
})
