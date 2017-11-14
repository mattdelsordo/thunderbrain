/* eslint-disable jsx-a11y/anchor-is-valid */
// @flow

import React from 'react'
import Helmet from 'react-helmet'
import { Link } from 'react-router-dom'
import { HOME_PAGE_ROUTE } from '../../routes'
import Nav from '../nav'

const title = 'Page Not Found!'

const NotFoundPage = () =>
  (
    <div className="container mt-4">
      <Helmet title={title} />
      <Nav />
      <div className="row">
        <div className="col-12">
          <h1>{title}</h1>
          <div><Link to={HOME_PAGE_ROUTE}>Go to the homepage</Link>.</div>
        </div>
      </div>
    </div>
  )

export default NotFoundPage
