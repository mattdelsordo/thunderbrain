// @flow

import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  console.log(state)
  return {
    // ideas: state.ideas,
    ideas: state.hello.get('session').get('ideas'),
  }
}

const IdeaList = ({ ideas }: Props) => {
  const ids = ideas || []
  return (
    <div>
      <ul>
        {ids.map((idea, i) => (
          <li key={i} className="list-group-item">{idea.text}</li>
        ))}
      </ul>
    </div>
  )
}

export default connect(mapStateToProps)(IdeaList)
