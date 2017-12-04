// @flow

import React from 'react'
import Helmet from 'react-helmet'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import {
  SIGN_IN_ROUTE,
  PROFILE_VIEW,
  BRAINSTORM_ROUTE, CHAT_ROUTE, RESULTS_ROUTE,
} from '../../../routes'
import AppNav from '../../../container/app-nav'
import { NO_USER, NO_SESSION } from '../../../redirect'
import { leaveRoom, beginBrainstorm } from '../../../action/actions'
import {
  LOBBY,
  BRAINSTORM,
  DELIBERATION,
  RESULTS,
} from '../../../phases'
import VideoChat from '../../../container/video-chat'

const mapStateToProps = (state) => {
  const user = state.hello.get('user')
  const session = state.hello.get('session')

  if (!user) {
    return {
      redirect: NO_USER,
      members: [],
    }
  } else if (!session) {
    return {
      redirect: NO_SESSION,
      members: [],
    }
  }

  return {
    username: user.get('name'),
    host: session.get('host'),
    members: session.get('members'),
    roomID: session.get('roomID'),
    topic: session.get('topic'),
    phase: session.get('phase'),
  }
}

const LobbyPage = ({
  dispatch, username, host, members, roomID, topic, redirect, phase,
}:
Props) => {
  let brainstormM
  let brainstormS
  let deliberationM
  let deliberationS

  // socket.on('new_member', (newMember) => {
  //   console.log(`[socket.io] ${newMember} joined the lobby`)
  //   // members.add(newMember)
  // })

  if (redirect === NO_USER) return (<Redirect to={SIGN_IN_ROUTE} />)
  else if (redirect === NO_SESSION) return (<Redirect to={PROFILE_VIEW} />)
  else if (phase === BRAINSTORM) return (<Redirect to={BRAINSTORM_ROUTE} />)
  else if (phase === DELIBERATION) return (<Redirect to={CHAT_ROUTE} />)
  else if (phase === RESULTS) return (<Redirect to={RESULTS_ROUTE} />)
  else if (phase === LOBBY) {
    return (
      <div className="container mt-4">
        <Helmet
          title={`Lobby | ${topic}`}
          meta={[
            { name: 'description', content: topic },
            { property: 'og:title', content: topic },
          ]}
        />
        <AppNav text="Lobby" />
        <div className="row">
          <div className="col-md-6 p-4">
            <h2 className="m=10">Topic: {topic} </h2>
            <h3 className="m-10">Room ID: {roomID.toUpperCase()}</h3>
            <h4>Members:</h4>
            <ul className="list-group">
              {members.map((member) => {
                if (member === username) {
                  return <li className="list-group-item list-group-item-info" key={member}>{member}</li>
                }
                  return <li className="list-group-item" key={member}>{member}</li>
              })}
            </ul>
            <button className="btn btn-primary mt-1" onClick={() => { dispatch(leaveRoom()) }}>Leave</button>
          </div>
          <div className="col-md-6 p-4">
            {username === host &&
            <form
              className="form-group"
              onSubmit={(e) => {
                e.preventDefault()
                const bmTrimmed = brainstormM.value.trim()
                const bsTrimmed = brainstormS.value.trim()
                const dmTrimmed = deliberationM.value.trim()
                const dsTrimmed = deliberationS.value.trim()
                if (!bmTrimmed && !bsTrimmed && !dmTrimmed && !dsTrimmed) {
                  return
                }
                const brainstormingSeconds = (Number(bmTrimmed) * 60) + Number(bsTrimmed)
                const deliberationSeconds = (Number(dmTrimmed) * 60) + Number(dsTrimmed)
                // console.log(`brainstorming: ${brainstormingSeconds} deliberation: ${deliberationSeconds}`)
                dispatch(beginBrainstorm(brainstormingSeconds, deliberationSeconds, roomID))
              }}
            >
              <div className="input-group">
                <span className="add-left">Brainstorm Time:</span>
                <input
                  required
                  type="number"
                  className="form-control"
                  placeholder="minutes"
                  ref={(node) => {
                    brainstormM = node
                  }}
                  onChange={() => {
                    if (brainstormM.value < 0) brainstormM.value = 0
                  }}
                />
                <span className="add-middle">:</span>
                <input
                  required
                  type="number"
                  className="form-control"
                  placeholder="seconds"
                  ref={(node) => {
                    brainstormS = node
                  }}
                  onChange={() => {
                    if (brainstormM.value < 0) brainstormM.value = 0
                  }}
                />
              </div>
              <div className="input-group">
                <span className="add-left">Deliberation Time:</span>
                <input
                  required
                  type="number"
                  className="form-control"
                  placeholder="minutes"
                  ref={(node) => {
                    deliberationM = node
                  }}
                  onChange={() => {
                    if (brainstormM.value < 0) brainstormM.value = 0
                  }}
                />
                <span className="add-middle">:</span>
                <input
                  required
                  type="number"
                  className="form-control"
                  placeholder="seconds"
                  ref={(node) => {
                    deliberationS = node
                  }}
                  onChange={() => {
                    if (brainstormM.value < 0) brainstormM.value = 0
                  }}
                />
              </div>
              <button
                className="btn btn-primary"
                type="submit"
              >
                Begin Session
              </button>
            </form>
            }
          </div>
        </div>
        <div className="row">
          <VideoChat roomID={roomID} checkVideoMsg />
        </div>
      </div>
    )
  }

  console.log('ERROR: invalid redirect in lobby page')
  return (<Redirect to={PROFILE_VIEW} />)
}

export default connect(mapStateToProps)(LobbyPage)
