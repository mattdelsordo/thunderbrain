/* eslint-disable jsx-a11y/no-redundant-roles */
// @flow

import React from 'react'

const CreateGroupModal = ({ handleClick }: Props) =>
  (
    <div className="create-group-modal modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Enter a Topic</h5>
            <button type="button" className="close" data-dismiss="modal">×</button>
          </div>
          <div className="modal-body">
            <input id="lobby-id" type="text" className="form-control" placeholder="Enter lobby name" />
          </div>
          <div className="modal-footer">
            <button type="button" role="button" className="btn btn-primary" onClick={handleClick}>Join</button>
            <button type="button" role="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )

export default CreateGroupModal
