// @flow

import React from 'react'
import Helmet from 'react-helmet'
import Nav from '../../nav'
import BigTitle from '../../big-title'
// import { Document, Page } from 'react-pdf'

// import { STATIC_PATH } from '../../config'

const title = 'Validation & Results'
// const proposal = `${STATIC_PATH}/res/project_proposal.pdf`

const ValidationPage = () =>
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
          title="validation"
          src="https://docs.google.com/document/d/e/2PACX-1vSC4zbTQGiBPmSd750Tni1zrSAlHjqJSe9h8BxdElSGo4PcfSKzIARRVBkGRVlAz6DNbS5hen-fvPov/pub?embedded=true"
          height="1000px"
          width="80%"
        />
      </div>
    </div>
  )


export default ValidationPage
