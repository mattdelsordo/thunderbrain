// @flow

import React from 'react'

const formatSecondsAsTime = (seconds) => {
  if (seconds) {
    const date = new Date(null)
    date.setSeconds(seconds)
    return date.toISOString().substr(14, 5)
    // return date.toISOString()
  }
  return '00:00'
}

// TODO: the clock needs to be made look pretty
const Clock = ({ time }: Props) => (
  <div>{formatSecondsAsTime(time)}</div>
)

export default Clock
