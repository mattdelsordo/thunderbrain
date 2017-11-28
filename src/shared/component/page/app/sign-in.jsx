/* eslint-disable jsx-a11y/anchor-is-valid */
// @flow

import React from 'react'
import Helmet from 'react-helmet'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import SignInForm from '../../../container/sign-in-form'
// import Nav from '../../nav'
import Nav2 from '../../nav2'
import { PROFILE_VIEW, REGISTER_ROUTE, GUEST_ROUTE } from '../../../routes'
import AppNav from '../../../container/app-nav'
import BigTitle from "../../big-title";

const title = 'Sign In'

const mapStateToProps = state => ({
  notLoggedIn: state.hello.get('user') === null,
})

const SIP = ({ notLoggedIn }: Props) => {
  if (notLoggedIn) {
    return (
        <dev>
          <Helmet
              title={title}
              meta={[
                  { name: 'description', content: 'A page to sign in from' },
                  { property: 'og:title', content: title },
              ]}
          />
          <AppNav text="Sign in" />
            {/*<BigTitle alexkautz="" />*/}
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h1>{title}</h1>
            <SignInForm />
            <Link to={REGISTER_ROUTE} className="btn btn-outline-primary"> Need an account? </Link>
            <Link to={GUEST_ROUTE} className="btn btn-outline-primary"> Want to just be a guest? </Link>
          </div>

        </div>
      </div>
        </dev>
    )
  }

  return (
    <Redirect to={PROFILE_VIEW} />
  )
}

const SignInPage = connect(mapStateToProps)(SIP)

export default SignInPage
