import React from 'react'
import Helmet from 'react-helmet'

import Nav from '../../nav'
import BigTitle from '../../big-title'

const title = 'ThunderBrain Commercial'

const CommercialPage = () =>
  (
    <div>
      <Helmet
        meta={[
          { name: 'description', content: title },
          { property: 'og:title', content: title },
        ]}
      />
      <Nav />
      <BigTitle alexkautz={title} />
      <div className="container">
        <div className="embed-responsive embed-responsive-16by9 col-xs-12 text-center">
          <iframe title="Thunderbrain Commercial" className="embed-responsive-item" width="560" height="315" src="https://www.youtube.com/embed/jf5SAm59Zf4" frameBorder="0" gesture="media" allowFullScreen />
        </div>
      </div>
    </div>
  )

export default CommercialPage
