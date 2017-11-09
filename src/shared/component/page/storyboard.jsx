// @flow

// This page is in charge of displaying the storyboard we made
import React from 'react'
import Helmet from 'react-helmet'

import { STATIC_PATH } from '../../config'

const title = 'ThunderBrain Storyboard'

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
          <img src="" class="img-responsive" alt="The tragedy of the modern age.">
          <img src="" class="img-responsive" alt="Suddenly, a new savior appears.">
          <img src="" class="img-responsive" alt="ThunderBrain: the true hero of our time.">
        </div>
      </div>
    </div>
  )

export default StoryboardPage
