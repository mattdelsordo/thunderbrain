// @flow

// This page is in charge of displaying the storyboard we made
import React from 'react'
import Helmet from 'react-helmet'

import { STATIC_PATH } from '../../config'

const title = 'The ThunderBrain Story'

const path1 = `${STATIC_PATH}/res/storyboard1.png`
const path2 = `${STATIC_PATH}/res/storyboard2.png`
const path3 = `${STATIC_PATH}/res/storyboard3.png`

const StoryboardPage = () =>
  (
    <div className="container mt-4">
      <Helmet
        title={title}
        meta={[
                    { name: 'description', constent: 'ThunderBrain Use-Case Storyboard' },
                    { property: 'og:title', content: title },
                ]}
      />
      <div className="row">
        <div className="col-12">
          <h1>{title}</h1>
          <img src={path1} className="storyboard_cell" alt="The tragedy of the modern age." />
          <img src={path2} className="storyboard_cell" alt="Suddenly, a new savior appears." />
          <img src={path3} className="storyboard_cell" alt="ThunderBrain: the true hero of our time." />
        </div>
      </div>
    </div>
  )

export default StoryboardPage
