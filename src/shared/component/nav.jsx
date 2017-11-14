/* eslint-disable jsx-a11y/no-redundant-roles,jsx-a11y/anchor-is-valid */
// @flow

import $ from 'jquery'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { APP_NAME } from '../config'
import {
  HOME_PAGE_ROUTE,
  // HELLO_PAGE_ROUTE,
  // HELLO_ASYNC_PAGE_ROUTE,
  // NOT_FOUND_DEMO_PAGE_ROUTE,
  PROFILE_VIEW,
  PROPOSAL_ROUTE,
  CHAT_ROUTE,
  STORYBOARD_ROUTE,
  COMMERCIAL_ROUTE,
  SIGN_IN_ROUTE,
} from '../routes'

const handleNavLinkClick = () => {
  $('body').scrollTop(0)
  $('.js-navbar-collapse').collapse('hide')
}

const Nav = () =>
  (
    <nav className="navbar navbar-toggleable-md navbar-inverse fixed-top bg-inverse">
      <button className="navbar-toggler navbar-toggler-right" type="button" role="button" data-toggle="collapse" data-target=".js-navbar-collapse">
        <span className="navbar-toggler-icon" />
      </button>
      <Link to={HOME_PAGE_ROUTE} className="navbar-brand">{APP_NAME}</Link>
      <div className="js-navbar-collapse collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          {[
            { route: HOME_PAGE_ROUTE, label: 'Home' },
            // { route: HELLO_PAGE_ROUTE, label: 'Say Hello' },
            // { route: HELLO_ASYNC_PAGE_ROUTE, label: 'Say Hello Asynchronously' },
            // { route: NOT_FOUND_DEMO_PAGE_ROUTE, label: '404 Demo' },
            { route: PROPOSAL_ROUTE, label: 'Proposal' },
            { route: STORYBOARD_ROUTE, label: 'Storyboard' },
            { route: COMMERCIAL_ROUTE, label: 'Commercial' },
            { route: 'wireframe', label: 'Wireframe' },
            // { route: PROFILE_VIEW, label: 'Profile View' },
            // { route: CHAT_ROUTE, label: 'Video Chat Test' },
            { route: SIGN_IN_ROUTE, label: 'Try It Out' },

          ].map((link) => {
            if (link.label === 'Wireframe') {
              return (
                <li className="nav-item" key={link.route}>
                  <a href="https://invis.io/HAEF2JFFD#/263444606_All" className="nav-link" key="wireframe">Wireframe</a>
                </li>
              )
            }
            return (
              <li className="nav-item" key={link.route}>
                <NavLink to={link.route} className="nav-link" activeStyle={{ color: 'white' }} exact onClick={handleNavLinkClick}>{link.label}</NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )

export default Nav
