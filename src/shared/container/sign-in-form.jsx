// @flow

import React from 'react'
import { connect } from 'react-redux'

import io from 'socket.io-client'
import { logIn } from '../action/actions'

const socket = io('http://localhost:8080')

const SIF = ({ dispatch }: Props) => {
  let username
  let password

  return (
    <div>
      <form
        className="form-group"
        onSubmit={(e) => {
          e.preventDefault()
          if (!username.value.trim() || !password.value.trim()) {
            return
          }
          // emitting a socket event to check login credentials
          socket.emit('log_in', {
            Username: username.value.trim(),
            Password: password.value.trim(),
          })

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
        <input
          className="form-control"
          type="password"
          placeholder="password"
          required
          ref={(node) => {
            password = node
          }}
        />
        <button
          className="btn btn-primary"
          type="submit"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}

const SignInForm = connect()(SIF)

export default SignInForm
