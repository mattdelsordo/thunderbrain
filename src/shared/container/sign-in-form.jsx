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
        className="form-group"
        onSubmit={(e) => {
                    e.preventDefault()
                    if (!username.value.trim() || !password.value.trim()) {
                        return
                    }
                    // dispatching to the state
                    dispatch(logIn(username.value.trim(), password.value.trim(), 'login'))
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
