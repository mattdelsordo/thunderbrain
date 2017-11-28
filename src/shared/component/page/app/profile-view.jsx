// @flow

import React from 'react'
import Helmet from 'react-helmet'
import { Redirect } from 'react-router-dom'
import $ from 'jquery'
import { randomBytes } from 'crypto'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import io from 'socket.io-client'

import ProfileViewInfo from '../../profile-view-info'
import {
  LOBBY_ROUTE,
  SIGN_IN_ROUTE,
} from '../../../routes'
import JoinGroupModal from '../../join-group-modal'
import CreateGroupModal from '../../create-room-modal'
import { joinRoom, createRoom } from '../../../action/actions'
import { LOGOUT, INROOM } from '../../../redirect'
import AppNav from '../../../container/app-nav'
import { STATIC_PATH } from '../../../config'
import BigTitle from '../../big-title'

const socket = io('http://localhost:8080')
const defaultPath = `${STATIC_PATH}/res/profile_default.jpg`

const mapStateToProps = (state) => {
  const user = state.hello.get('user')
  if (user) {
    return {
      username: state.hello.get('user').get('name'),
      photoPath: state.hello.get('user').get('photoPath'),
      pastCalls: state.hello.get('user').get('pastCalls'),
      redirect: (state.hello.get('session') ? INROOM : null),
    }
  }

  return {
    username: null,
    photoPath: null,
    pastCalls: [],
    redirect: LOGOUT,
  }
}

const PVP = ({
  dispatch,
  username,
  photoPath,
  pastCalls,
  redirect,
}:
Props) => {
  if (redirect === LOGOUT) {
    return (
      <Redirect to={SIGN_IN_ROUTE} />
    )
  } else if (redirect === INROOM) {
    return (
      <Redirect to={LOBBY_ROUTE} />
    )
  }
  const user = username || 'NULL'
  const title = `${user}'s Profile`

  return (
    <div>
        <Helmet
            title={title}
            meta={[
                { name: 'description', content: title },
                { property: 'og:title', content: title },
            ]}
        />
        <AppNav text="Profile" />
        {/*<BigTitle alexkautz="Profile"/>*/}
        <div className="container mt-4">
      <div className="row" width="100%">
        <div className="col-sm-12 col" width="50%">
            <h2 className="display-4">{user || 'NO PROFILE FOUND'}</h2>
        </div>
      </div>
      <div className="row" width="100%">
        <div className="col-md-6 col-lg-3">
          <img src={photoPath || defaultPath} alt="Profile" height="200" width="200" />
        </div>
        <div className="col-md-3">
          <button type="button" role="button" data-toggle="modal" data-target=".create-group-modal" className="btn btn-primary mt-1 big"> Create Room </button>
        </div>
        <div className="col-md-3">
          <button type="button" role="button" data-toggle="modal" data-target=".join-group-modal" className="btn btn-primary mt-1 big"> Join Room </button>
        </div>
      </div>
      <div>
        <ul>
          {pastCalls.map((call, i) => (
            <li key={i}>{`${call.date} "${call.topic}"`}</li>
            ))}
        </ul>
      </div>
      <JoinGroupModal
        handleClick={(roomID) => {
          // emitting socket event to join the host to the socket for the new room
          socket.emit('join_room', roomID, user)
          $('.join-group-modal').modal('hide')
          dispatch(joinRoom(roomID, '???', '???', '???', []))
        }}
      />
      <CreateGroupModal
        handleClick={(topic) => {
          const newRoomID = randomBytes(3).toString('hex')
          socket.emit('join_room', newRoomID, user)
          $('.create-group-modal').modal('hide')
          dispatch(createRoom(newRoomID, user, topic))
        }}
      />
    </div>
    </div>
  )
}

const ProfileViewPage = connect(mapStateToProps)(PVP)

export default ProfileViewPage
