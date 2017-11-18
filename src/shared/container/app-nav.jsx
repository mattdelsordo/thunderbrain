// @flow

import $ from 'jquery'
import React from 'react'
import { connect } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { APP_NAME } from '../config'
import { logOut } from '../action/actions'
import {
  HOME_PAGE_ROUTE,
  SIGN_IN_ROUTE,
} from '../routes'

const mapStateToProps = state => ({
  signedIn: state.hello.get('user') !== null,
})

const AppNav = ({ dispatch, signedIn }: Props) => {
  if(signedIn) return (
    <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
      <button className="navbar-toggler navbar-toggler-right" type="button" role="button" data-toggle="collapse" data-target=".js-navbar-collapse">
        <span className="navbar-toggler-icon" />
      </button>
      <Link to={HOME_PAGE_ROUTE} className="navbar-brand">{APP_NAME}</Link>
      <div className="js-navbar-collapse collapse navbar-collapse">
        <ul className="nav navbar-nav navbar-right">
          <NavLink to={SIGN_IN_ROUTE} className="nav-link" activeStyle={{ color: 'white'}} exact onClick={() => {dispatch(logOut())}}>Sign Out</NavLink>
        </ul>
      </div>
    </nav>
  )
  return (
    <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
      <button className="navbar-toggler navbar-toggler-right" type="button" role="button" data-toggle="collapse" data-target=".js-navbar-collapse">
        <span className="navbar-toggler-icon" />
      </button>
      <Link to={HOME_PAGE_ROUTE} className="navbar-brand">{APP_NAME}</Link>
      <div className="js-navbar-collapse collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {/*<NavLink to={SIGN_IN_ROUTE} className="nav-link" activeStyle={{ color: 'white'}} exact onClick={handleNavLinkClick}>Sign In</NavLink>*/}
        </ul>
      </div>
    </nav>
  )
}

export default connect(mapStateToProps)(AppNav)
