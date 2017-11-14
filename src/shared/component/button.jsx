/* eslint-disable jsx-a11y/no-redundant-roles */
// @flow

import React from 'react'

type Props = {
  label: string,
  handleClick: Function,
}

const Button = ({ label, handleClick }: Props) =>
  (
    <button
      onClick={handleClick}
      className="btn btn-primary m-1"
      type="button"
      role="button"
    >{label}
    </button>
  )

export default Button
