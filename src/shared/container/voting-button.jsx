// @flow

import React from 'react'
import { connect } from 'react-redux'

import { voteIdea } from '../action/actions'

const VotingButton = ({ dispatch, idea, totalMembers }: Props) => {
  const threshold = (totalMembers / 2) || 0
  console.log(`${idea.points}/${threshold}`)
  // TODO: theme these dynamically in a way that actually makes sense
  if (idea.points > threshold) {
    return (
      <button onClick={() => { dispatch(voteIdea(idea.text)) }} className="btn btn-primary m-4">{idea.text}</button>
    )
  } else {
    return (
      <button onClick={() => { dispatch(voteIdea(idea.text)) }} className="btn btn-secondary m-4">{idea.text}</button>
    )
  }
}

export default connect()(VotingButton)
