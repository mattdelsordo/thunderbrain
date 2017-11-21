// @flow

import React from 'react'
import { connect } from 'react-redux'

const ss = ({ placeholder = 'Enter your text.', buttonText = 'Submit', action, dispatch }: Props) => {
  let input

  return (
    <div>
      <form
        className="form-inline"
        onSubmit={(e) => {
          e.preventDefault()
          if (!input.value.trim()) {
            return
          }
          dispatch(action(input.value))
          input.value = ''
        }}
      >
        <input
          className="form-control mt-1"
          ref={(node) => {
            input = node
          }}
          placeholder={placeholder}
          autofocus
        />
        <button className="btn btn-primary mt-1" type="submit" onClick={() => {
          input.focus()
        }}>
          {buttonText}
        </button>
      </form>
    </div>
  )
}

const SubmitString = connect()(ss)

export default SubmitString
