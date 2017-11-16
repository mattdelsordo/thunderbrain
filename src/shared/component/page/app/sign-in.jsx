// @flow

import React from 'react'
import Helmet from 'react-helmet'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import SignInForm from '../../../container/sign-in-form'
// import Nav from '../../nav'
import { PROFILE_VIEW, REGISTER_ROUTE } from '../../../routes'

const title = 'Sign In'

const mapStateToProps = state => ({
  notLoggedIn: state.hello.get('user') === null,
})

const SIP = ({ notLoggedIn }: Props) => {
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
            <SignInForm />
            <Link to={REGISTER_ROUTE} className="btn btn-primary"> Need an account? </Link>
          </div>
        </div>
      </div>
    )
  }
  else {
    return (
      <Redirect to={PROFILE_VIEW} />
    )
  }
}

const SignInPage = connect(mapStateToProps)(SIP)

export default SignInPage
