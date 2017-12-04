/* eslint-disable jsx-a11y/no-redundant-roles */
// @flow

import React from 'react'
import Helmet from 'react-helmet'

// import ModalExample from '../modal-example'
import { APP_NAME, STATIC_PATH } from '../../../config'
import Nav from '../../nav'
import BigTitle from '../../big-title'

const posterPath = `${STATIC_PATH}/res/poster.jpg`

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
      {/*<BigTitle alexkautz={APP_NAME} />*/}
      <div className="container-fluid">
        {/*<h3>ThunderBrain: A brainstorming web app for unique ideas. Now in alpha!</h3>*/}
        <img src={posterPath} className="poster-cell pl-5 pr-5 pb-3 pt-3" alt="science." />
      </div>
      {/* <ModalExample /> */}
    </div>// eslint-disable-next-line no-console
  )

export default HomePage
