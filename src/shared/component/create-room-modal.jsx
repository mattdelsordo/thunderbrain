/* eslint-disable jsx-a11y/no-redundant-roles */
// @flow

import React from 'react'

const CreateGroupModal = ({ handleClick }: Props) => {
  let topic
  return (
    <div className="create-group-modal modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Enter a Topic</h5>
            <button type="button" className="close" data-dismiss="modal">×</button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault()
              if (!topic.value.trim()) return
              handleClick(topic.value)
              topic.value = ''
            }}
          >
            <div className="modal-body">
              <input
                className="form-control"
                ref={(node) => {
                  topic = node
                }}
                placeholder="Enter your discussion topic"
              />
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
              <button type="button" role="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export default CreateGroupModal
