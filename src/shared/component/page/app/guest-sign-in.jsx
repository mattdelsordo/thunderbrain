// @flow

import React from 'react'
import Helmet from 'react-helmet'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import GuestSignInForm from '../../../container/guest-sign-in-form'
// import Nav from '../../nav'
import { PROFILE_VIEW, REGISTER_ROUTE, SIGN_IN_ROUTE } from '../../../routes'

const title = 'Guest Sign In'

const mapStateToProps = state => ({
  notLoggedIn: state.hello.get('user') === null,
})

const GSIP = ({ notLoggedIn }: Props) => {
  if (notLoggedIn) {
    return (
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
            <GuestSignInForm />
            <Link to={REGISTER_ROUTE} className="btn btn-outline-primary"> Want an account? </Link>
            <Link to={SIGN_IN_ROUTE} className="btn btn-outline-primary"> Have an account? </Link>
          </div>

        </div>
      </div>
    )
  }

  return (
    <Redirect to={PROFILE_VIEW} />
  )
}

const GuestSignInPage = connect(mapStateToProps)(GSIP)

export default GuestSignInPage
