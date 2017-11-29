/* eslint-disable jsx-a11y/no-redundant-roles */
// @flow

import React from 'react'

type Props = {
    alexkautz: string,
}

const BigTitle = ({ alexkautz }: Props) => (
  <div className="jumbotron jumbotron-fluid">
    {/* <div className="container"> */}
    <h1 className="display-4">{alexkautz}</h1>
    {/* </div> */}
  </div>
)

export default BigTitle
