// @flow

import React from 'react'
import { connect } from 'react-redux'

import { logIn } from '../action/actions'

const SIF = ({ dispatch }: Props) => {
  let username
  let password

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (!username.value.trim() || !password.value.trim()) {
            return
          }
          // TODO: Here is where you would validate the login stuff, before
          // dispatching to the state
          dispatch(logIn(username.value))
          username.value = ''
        }}
      >
        <input
          ref={(node) => {
            username = node
          }}
          placeholder="Username"
        />
        <input
          ref={(node) => {
            password = node
          }}
          placeholder="Password"
        />
        <button type="submit">
          Sign In
        </button>
      </form>
    </div>
  )
}

const SignInForm = connect()(SIF)

export default SignInForm
