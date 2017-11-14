// @flow

import React from 'react'
import Helmet from 'react-helmet'
import { Link, Redirect } from 'react-router-dom'
import $ from 'jquery'

import ProfileViewInfo from '../../profile-view-info'
import { LOBBY_ROUTE } from '../../../routes'
import JoinGroupModal from '../../join-group-modal'
import CreateGroupModal from '../../create-room-modal'
import Nav from '../../nav'

const title = 'Profile View'

class ProfileViewPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: false,
      pastCalls: props.pastCalls || ['No past calls.'],
    }
  }

  redirect() {
    $('.join-group-modal').modal('hide')
    $('.create-group-modal').modal('hide')

    this.setState({
      redirect: true,
    })
  }

  render() {
    if (this.state.redirect) return <Redirect push to={LOBBY_ROUTE} />

    return (
      <div className="container mt-4">
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: 'A page to view your profile' },
            { property: 'og:title', content: title },
          ]}
        />
        <Nav />
        <div className="row" width="100%">
          <div className="col-xs-6" width="50%">
            <ProfileViewInfo />
          </div>
          <div className="col-xs-6" width="50%">
            <div className="row m-2">
              <div className="col-lg-12">
                <button type="button" role="button" data-toggle="modal" data-target=".create-group-modal" className="btn btn-primary mt-1"> Create Room </button>
              </div>
              <div className="col-lg-12">
                <button type="button" role="button" data-toggle="modal" data-target=".join-group-modal" className="btn btn-primary mt-1"> Join Room </button>
              </div>
            </div>
          </div>
        </div>
          <div>
              <ul>
                  {this.state.pastCalls.map((call, i) => {
                      return (
                          <li key={i}>{call}</li>
                      )
                  })}
              </ul>
          </div>
        <JoinGroupModal handleClick={this.redirect.bind(this)} />
        <CreateGroupModal handleClick={this.redirect.bind(this)} />
      </div>
    )
  }
}

export default ProfileViewPage
