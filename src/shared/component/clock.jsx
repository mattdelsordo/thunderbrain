// @flow

import React from 'react'

const formatSecondsAsTime = (seconds) => {
  const date = new Date(null)
  date.setSeconds(seconds)
  return date.toISOString().substr(11, 8)
}

const Clock = ({ time }: Props) => (
  <div>{formatSecondsAsTime(time)}</div>
)

export default Clock
