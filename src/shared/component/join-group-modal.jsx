/* eslint-disable jsx-a11y/no-redundant-roles */
// @flow

import React from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'
import io from 'socket.io-client'

import { IO_CLIENT_JOIN_ROOM } from '../routes'
import { joinRoom } from '../action/actions'

const socket = io('http://localhost:8080')

const JGM = ({ handleClick }: Props) => {
  let roomID
  return (
    <div className="join-group-modal modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Join a Group</h5>
            <button type="button" className="close" data-dismiss="modal">×</button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!roomID.value.trim()) return
                $('.join-group-modal').modal('hide')
                handleClick(roomID.value)
                roomID.value = ''
            }}
          >
            <div className="modal-body">
              <input
                className="form-control"
                ref={(node) => {
                  roomID = node
                }}
                placeholder="Enter a room ID"
              />
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Join
              </button>
              <button type="button" role="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

const JoinGroupModal = connect()(JGM)

export default JoinGroupModal
