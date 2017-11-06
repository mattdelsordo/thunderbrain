// @flow

import React from 'react'
import Helmet from 'react-helmet'
// import { Document, Page } from 'react-pdf'

// import { STATIC_PATH } from '../../config'

const title = 'ThunderBrain Proposal'
// const proposal = `${STATIC_PATH}/res/project_proposal.pdf`

const ProposalPage = () =>
  (
    <div className="container mt-4">
      <Helmet
        title={title}
        meta={[
                    { name: 'description', constent: 'ThunderBrain Project Proposal' },
                    { property: 'og:title', content: title },
                ]}
      />

      {/* <a href={proposal}>
                <Document file={proposal}>
                    <Page pageNumber={1} />
                    <Page pageNumber={2} />
                    <Page pageNumber={3} />
                    <Page pageNumber={4} />
                    <Page pageNumber={5} />
                    <Page pageNumber={6} />
                    <Page pageNumber={7} />
                    <Page pageNumber={8} />
                    <Page pageNumber={9} />
                    <Page pageNumber={10} />
                    <Page pageNumber={11} />
                </Document>
            </a> */}
      <iframe title="proposal" src="https://docs.google.com/document/d/e/2PACX-1vTtIdwaRDK1zlgs8Szt0n7zpiz9Gb8j28TPtdKVHlOeBUtcDIJeBvMm1Csfmq1o8jjE8TBJqSYOJDhS/pub?embedded=true" height="800" width="800" />
    </div>
  )


export default ProposalPage
