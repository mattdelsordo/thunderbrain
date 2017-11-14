import React from 'react'
import Helmet from 'react-helmet'

import Nav from '../nav'

const title = 'Thunderbrain Commercial'

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
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 mt-4 center-block">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/jf5SAm59Zf4" frameborder="0" gesture="media" allowfullscreen />
          </div>
        </div>
      </div>
    </div>
  )

export default CommercialPage
