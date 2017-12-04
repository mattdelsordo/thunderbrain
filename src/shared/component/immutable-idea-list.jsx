// @flow

import React from 'react'

const ImmutableIdeaList = ({ list }: Props) => {
  if (list.size > 0) {
    return (
      <ol className="list-group">
        {
          list.map((idea, i) => (
            <li key={i} className="list-group-item">
              {`${idea.get('text')} (+${idea.get('points').size})`}
            </li>
          ))
        }
      </ol>
    )
  }

  return (
    <h3>Nothing!</h3>
  )
}

export default ImmutableIdeaList
