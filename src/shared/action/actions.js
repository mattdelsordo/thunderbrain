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
export const logIn = (name, pass, login_type) => ({
  type: LOG_IN,
  name,
  pass,
  login_type,
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

// Begins the brainstorming phase
export const BEGIN_BRAINSTORM = 'BEGIN_BRAINSTORMING'
export const beginBrainstorm = (brainstormSeconds, deliberationSeconds, roomID) => ({
  type: BEGIN_BRAINSTORM,
  brainstormSeconds,
  deliberationSeconds,
  roomID,
  phase: BRAINSTORM,
})

// Move to the brainstorming phase
export const MOVE_TO_BRAINSTORM = 'MOVE_TO_BRAINSTORMING'
export const moveToBrainstorm = (brainstormSeconds, deliberationSeconds, roomID) => ({
  type: MOVE_TO_BRAINSTORM,
  brainstormSeconds,
  deliberationSeconds,
  roomID,
  phase: BRAINSTORM,
})

// Begins deliberations
export const BEGIN_DELIBERATIONS = 'BEGIN_DELIBERATIONS'
export const beginDeliberations = allUserIdeas => ({
  type: BEGIN_DELIBERATIONS,
  ideas: allUserIdeas.map(text => ({
    text,
    points: [],
    userDidVote: false,
  })),
  phase: DELIBERATION,
})

// resets user votes on ideas
export const RESET_VOTES = 'RESET_VOTES'
export const resetVotes = () => ({
  type: RESET_VOTES,
})

// Idea voting actions
export const VOTE_IDEA = 'VOTE_IDEA'
export const voteIdea = (idea, user, roomID) => ({
  type: VOTE_IDEA,
  idea,
  user,
  roomID,
})

// Updates idea votes
export const UPDATE_VOTED_IDEA = 'UPDATE_VOTED_IDEA'
export const updateVotedIdea = (idea, user) => ({
  type: UPDATE_VOTED_IDEA,
  idea,
  user,
})


export const SET_BRAINSTORM_TIME = 'SET_BRAINSTORM_TIME'
export const setBrainstormTime = newTime => ({
  type: SET_BRAINSTORM_TIME,
  newTime,
})

export const SET_DELIBERATION_TIME = 'SET_DELIBERATION_TIME'
export const setDeliberationTime = newTime => ({
  type: SET_DELIBERATION_TIME,
  newTime,
})

export const ADD_DELIBERATION_TIME = 'ADD_DELIBERATION_TIME'
export const addDeliberationTime = roomID => ({
  type: ADD_DELIBERATION_TIME,
  roomID,
})
