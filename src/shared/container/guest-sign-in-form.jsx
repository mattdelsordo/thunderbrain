// @flow

import React from 'react'
import { connect } from 'react-redux'

import { logIn } from '../action/actions'

const GSIF = ({ dispatch }: Props) => {
  let username

  return (
    <div>
      <form
        className="form-group"
        onSubmit={(e) => {
          e.preventDefault()
          if (!username.value.trim()) {
            return
          }
          // dispatching to the state
          dispatch(logIn(username.value.trim()))
          username.value = ''
        }}
      >
        <input
          className="form-control"
          type="text"
          placeholder="user name"
          required
          ref={(node) => {
            username = node
          }}
        />
        <button
          className="btn btn-primary"
          type="submit"
        >
          Sign In As a Guest
        </button>
      </form>
    </div>
  )
}

const GuestSignInForm = connect()(GSIF)

export default GuestSignInForm
