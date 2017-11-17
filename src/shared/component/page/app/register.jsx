// @flow

import React from 'react'
import Helmet from 'react-helmet'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import { connect } from 'react-redux'

import SignUpForm from '../../../container/sign-up-form'
import { PROFILE_VIEW, SIGN_IN_ROUTE, GUEST_ROUTE } from '../../../routes'

const title = 'Sign Up'

const mapStateToProps = state => ({
  socket: state.hello.get('socket'),
  notLoggedIn: state.hello.get('user') === null,
})

const SignUpPage = ({ socket, notLoggedIn }: Props) => {
  if (!notLoggedIn) {
    return (<Redirect to={PROFILE_VIEW} />)
  }

  return (
    <div>
      <CookiesProvider>
        <div className="container mt-4">
          <Helmet
            title={title}
            meta={[
              { name: 'description', content: 'A page to sign in from' },
              { property: 'og:title', content: title },
            ]}
          />
          <div className="row">
            <div className="col-12">
              <h1>{title}</h1>
              <SignUpForm socket={socket} />
              <Link to={SIGN_IN_ROUTE} className="btn btn-outline-primary"> Already have an account? </Link>
              <Link to={GUEST_ROUTE} className="btn btn-outline-primary"> Want to just be a guest? </Link>
            </div>
          </div>
        </div>
      </CookiesProvider>
    </div>
  )
}

export default connect(mapStateToProps)(SignUpPage)
