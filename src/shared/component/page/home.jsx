/* eslint-disable jsx-a11y/no-redundant-roles */
// @flow

import React from 'react'
import Helmet from 'react-helmet'

// import ModalExample from '../modal-example'
import { APP_NAME } from '../../config'
import Nav from '../nav'

const HomePage = () =>
  (
    <div>
      <Helmet
        meta={[
          { name: 'description', content: 'Hello App is an app to say hello' },
          { property: 'og:title', content: APP_NAME },
        ]}
      />
      <Nav />
      <div className="jumbotron">
        <div className="container">
          <h1 className="display-3 mb-4">{APP_NAME}</h1>
        </div>
      </div>
      <div className="container">
        <div className="row">
          {/* <div className="col-md-4 mb-4">
            <h3 className="mb-3">Bootstrap</h3>
            <p>
              <button type="button" role="button" data-toggle="modal"
              data-target=".js-modal-example" className="btn btn-primary">Open Modal</button>
            </p>
          </div>
          <div className="col-md-4 mb-4">
            <h3 className="mb-3">JSS (soon)</h3>
          </div>
          <div className="col-md-4 mb-4">
            <h3 className="mb-3">Websockets</h3>
            <p>Open your browser console.</p>
          </div> */}
          Coming Soon.
        </div>
      </div>
      {/* <ModalExample /> */}
    </div>// eslint-disable-next-line no-console
  )

export default HomePage
