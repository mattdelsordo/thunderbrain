// @flow

import React from 'react'
import { connect } from 'react-redux'

const ss = ({ placeholder = 'Enter your text.', buttonText = 'Submit', action, dispatch }: Props) => {
  let input

  return (
    <div>
      <form
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
          ref={(node) => {
            input = node
          }}
          placeholder={placeholder}
        />
        <button type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  )
}

const SubmitString = connect()(ss)

export default SubmitString
