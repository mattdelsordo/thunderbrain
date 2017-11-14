import React from 'react'

const SignInForm = () =>
  (
    <div className="form-inline">
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          placeholder="user name"
        />
        <input
          className="form-control"
          type="password"
          placeholder="password"
        />

        <button
          className="btn btn-primary"
          type="button"
        >
                    Sign In
        </button>
      </div>
    </div>
  )

export default SignInForm
