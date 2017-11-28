// @flow

import React from 'react'
import { connect } from 'react-redux'

import { voteIdea } from '../action/actions'

const VotingButton = ({ dispatch, idea, totalMembers, user }: Props) => {
  const threshold = (totalMembers / 2) || 0
  console.log(`${idea.points.length}/${threshold}`)
  // TODO: theme these dynamically in a way that actually makes sense
  if (idea.points.length > threshold) {
    return (
      <div>
        <button onClick={() => { dispatch(voteIdea(idea.text, user)) }} className="btn btn-primary m-4">{`${idea.text} +${idea.points.length}`}</button>
      </div>
    )
  } else {
    return (
      <div>
        <button onClick={() => { dispatch(voteIdea(idea.text, user)) }} className="btn btn-secondary m-4">{`${idea.text} +${idea.points.length}`}</button>
      </div>
    )
  }
}

export default connect()(VotingButton)