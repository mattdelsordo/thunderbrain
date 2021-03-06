// @flow

import React from 'react'
import Helmet from 'react-helmet'
import Nav from '../../nav'
import BigTitle from '../../big-title'
// import { Document, Page } from 'react-pdf'

// import { STATIC_PATH } from '../../config'

const title = 'Proposal'
// const proposal = `${STATIC_PATH}/res/project_proposal.pdf`

const ProposalPage = () =>
  (
    <div >
      <Helmet
        title={title}
        meta={[
                    { name: 'description', constent: 'ThunderBrain Project Proposal' },
                    { property: 'og:title', content: title },
                ]}
      />
      <Nav />
      <BigTitle alexkautz={title} />
      <div className="container">
        <iframe
          title="proposal"
          src="https://docs.google.com/document/d/e/2PACX-1vTtIdwaRDK1zlgs8Szt0n7zpiz9Gb8j28TPtdKVHlOeBUtcDIJeBvMm1Csfmq1o8jjE8TBJqSYOJDhS/pub?embedded=true"
          height="1000px"
          width="80%"
        />
      </div>
    </div>
  )


export default ProposalPage
