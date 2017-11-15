// @flow

import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  console.log(state)
  return {
    // ideas: state.ideas,
    ideas: state.hello.get('ideas'),
  }
}

const IdeaList = ({ ideas }: Props) => {
  const ids = ideas || []
  return (
    <div>
      <ul>
        {ids.map((idea, i) => (
          <li key={i}>{idea.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default connect(mapStateToProps)(IdeaList)
