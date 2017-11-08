// @flow

import React from 'react'
import Helmet from 'react-helmet'
// import { SimplePDF } from 'simple-react-pdf'
// import PDF from 'react-pdf-js'
import { Document, Page } from 'react-pdf'

import { STATIC_PATH } from '../../config'

const title = 'ThunderBrain Proposal'
const proposal = `${STATIC_PATH}/res/project_proposal.pdf`

// const ProposalPage = () => {
//     return (
//         <SimplePDF file={proposal} style="width: 350px; height = 500px; border= 1px dashed red; margin: 15px; padding: 15px; float: left;"/>
//     )
// }

class ProposalPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numPages: null,
            pageNumber: 1,
        }
    }

    onDocumentLoad({ numPages }) {
        this.setState({ numPages })
    }

    changePage(by) {
        this.setState(prevState => ({
            pageNumber: prevState.pageNumber + by,
        }))
    }

    render() {
        const { numPages, pageNumber } = this.state

        return (
            <div className="container mt-4">
                <Helmet
                    title={title}
                    meta={[
                        { name: 'description', constent: 'ThunderBrain Project Proposal' },
                        { property: 'og:title', content: title },
                    ]}
                />

                <Document
                    file={proposal}
                    onLoadSuccess={this.onDocumentLoad.bind(this)}
                >
                    {
                        Array.from(
                            new Array(numPages),
                            (e1, index) => (
                                <Page
                                    key={`page_${index + 1}`}
                                    pageNumber={index + 1}
                                    onRenderSuccess={this.onPageRenderSuccess}
                                />
                            )
                        )
                    }
                </Document>
                <p>Page {pageNumber} of {numPages}</p>
            </div>
        )
    }

    // constructor(props) {
    //     super(props)
    //     this.state = {}
    // }

    // onDocumentComplete(pages) {
    //     this.setState({ page: 1, pages });
    // }

    // onPageComplete(page) {
    //     this.setState({ page });
    // }

    // handlePrevious() {
    //     this.setState({ page: this.state.page - 1 });
    // }

    // handleNext() {
    //     this.setState({ page: this.state.page + 1 });
    // }

    // renderPagination(page, pages) {
    //     let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    //     if (page === 1) {
    //         previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    //     }
    //     let nextButton = <li className="next" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    //     if (page === pages) {
    //         nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    //     }
    //     return (
    //         <nav>
    //         <ul className="pager">
    //             {previousButton}
    //             {nextButton}
    //         </ul>
    //         </nav>
    //         );
    // }

    // render() {
    //     let pagination = null

    //     if(this.state.pages) {
    //         pagination = this.renderPagination(this.state.page, this.state.pages)
    //     }

    //     return (
    //         <div className="container mt-4">
    //             <Helmet
    //                 title={title}
    //                 meta={[
    //                     { name: 'description', constent: 'ThunderBrain Project Proposal' },
    //                     { property: 'og:title', content: title },
    //                 ]}
    //             />
    //             <div className="row">
    //                 <div className="col-12">
    //                     <PDF file={proposal} onDocumentComplete={this.onDocumentComplete} onPageComplete={this.onPageComplete} page={this.state.page} />
    //                     {pagination}
    //                 </div>
    //             </div>
    //         </div>
    //     )
    // }
}

export default ProposalPage
