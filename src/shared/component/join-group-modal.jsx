/* eslint-disable jsx-a11y/no-redundant-roles */
// @flow

import React from 'react'

const JoinGroupModal = ({ handleClick }: Props) => {
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

export default JoinGroupModal
