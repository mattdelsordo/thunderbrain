// @flow

import React from 'react'
import { randomBytes } from 'crypto'
import { Link } from 'react-router-dom'

import randomname from '../../../randomname'
import { BRAINSTORM_ROUTE, PROFILE_VIEW } from '../../../routes'

class LobbyPage extends React.Component {
  constructor(props) {
    super(props)

    const username = props.username || randomname()
    this.state = {
      owner: props.owner || username,
      username,
      members: [username],
      roomName: props.roomName || randomBytes(3).toString('hex'),
    }
  }

  render() {
    if (this.state.owner === this.state.username) {
      return (
        <div className="container mt-4">
          <div className="row">
            <div className="col-sm-6 p-4">
              <h2 className="m-10">Room: {this.state.roomName}</h2>
              <h3>Members:</h3>
              <ul className="list-group">
                {this.state.members.map((member) => {
                  if (member === this.state.username) return <li className="list-group-item list-group-item-info" key={member}>{member}</li>
                  return <li className="list-group-item" key={member}>{member}</li>
                })}
              </ul>
              <Link to={PROFILE_VIEW} className="btn btn-primary mt-1"> Leave </Link>
            </div>

            <div className="col-sm-6 p-4" >
              <input id="topic-field" type="text" className="form-control mt-1" placeholder="Enter your premise" />
              <div className="input-group mt-1">
                <input id="time-field" type="text" className="form-control" placeholder="Time Limit" />
                <span className="input-group-addon">seconds</span>
              </div>
              <Link to={BRAINSTORM_ROUTE} className="btn btn-primary mt-1"> Begin Session </Link>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h2 className="m-10">Room: {this.state.roomName}</h2>

            <h3>Members:</h3>
            <ul className="list-group">
              {this.state.members.map((member) => {
                if (member === this.state.username) return <li className="list-group-item list-group-item-info" key={member}>{member}</li>
                return <li className="list-group-item" key={member}>{member}</li>
              })}
            </ul>
            <Link to={PROFILE_VIEW} className="btn btn-primary mt-1"> Leave </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default LobbyPage
