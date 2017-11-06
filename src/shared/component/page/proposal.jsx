// @flow

import React from 'react'
import Helmet from 'react-helmet'
import { Document, Page } from 'react-pdf'

import { STATIC_PATH } from '../../config'

const title = 'ThunderBrain Proposal'
const proposal = `${STATIC_PATH}/res/project_proposal.pdf`

const ProposalPage = () => {
    return (
        <div className="container mt-4">
            <Helmet
                title={title}
                meta={[
                    { name: 'description', constent: 'ThunderBrain Project Proposal' },
                    { property: 'og:title', content: title },
                ]}
            />
            
            <a href={proposal}>
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
            </a>
        </div>
    )
}

export default ProposalPage
