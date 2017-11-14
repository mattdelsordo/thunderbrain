import React from 'react'

const Results = ({prompt, ideas}: Props) => {
  const sorted = ideas.sort((a, b) => {
    return ((a.points < b.points) ? -1 : ((a.points > b.points) ? 1 : 0))
  })

  return (
    <div>
      <h1>{prompt || '??????'}</h1>
      <div className="row">
        <div className="col-sm-6">
          <h3>Ideas</h3>
          <ul>
            {sorted.map((item) => {
              return (<li>{item.body}</li>)
            })}
          </ul>
        </div>
        <div className="col-sm-6">
          <h3>Points</h3>
          <ul>
            {sorted.map((item) => {
              return (<li>{item.points}</li>)
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Results
