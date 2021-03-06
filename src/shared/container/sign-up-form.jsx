// @flow

import React from 'react'
import { connect } from 'react-redux'
import io from 'socket.io-client'
import { logIn } from '../action/actions'

const SignUpForm = ({ dispatch }: Props) => {
  let password
  let confirm
  let username
  return (
    <div>
      <form
        className="form-group"
        onSubmit={(e) => {
          e.preventDefault()
          if (!password.value.trim() || !confirm.value.trim() || !username.value.trim()) {
            alert('Fields must not be blank!')
          } else if (password.value.trim() === confirm.value.trim()) {
            // 'log the user in' after signing up
            dispatch(logIn(username.value.trim(), password.value.trim(), 'signup'))
            username.value = ''
          } else {
            alert('Passwords don\'t match!')
          }
        }}
      >
        <input
          className="form-control"
          type="text"
          placeholder="user name"
          required
          name="username"
          ref={(node) => {
            username = node
          }}
        />
        <input
          className="form-control"
          type="password"
          placeholder="password"
          required
          name="password"
          ref={(node) => {
            password = node
          }}
        />
        <input
          className="form-control"
          type="password"
          placeholder="confirm password"
          required
          name="confirmpassword"
          ref={(node) => {
            confirm = node
          }}
        />
        <button
          className="btn btn-primary"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  )
}

export default connect()(SignUpForm)
