/* eslint-disable jsx-a11y/no-redundant-roles */
// @flow

import React from 'react'
import Helmet from 'react-helmet'

// import ModalExample from '../modal-example'
import { APP_NAME } from '../../../config'
import Nav from '../../nav'
import BigTitle from '../../big-title'

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
      <BigTitle alexkautz={APP_NAME} />
      <div className="container">
        <div className="row">
          <h3>ThunderBrain: A brainstorming web app for unique ideas. Now in alpha!</h3>
        </div>
      </div>
      {/* <ModalExample /> */}
    </div>// eslint-disable-next-line no-console
  )

export default HomePage
