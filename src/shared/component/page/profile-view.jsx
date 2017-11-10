// @flow

import React from 'react'
import Helmet from 'react-helmet'
import { Link, Redirect } from 'react-router-dom'
import $ from 'jquery'

import ProfileViewInfo from '../profile-view-info'
import { LOBBY_ROUTE } from '../../routes'
import JoinGroupModal from '../join-group-modal'

const title = 'Profile View'

class ProfileViewPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect: false,
    }
  }

  redirect() {
    $('.join-group-modal').modal('hide')

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
        <div className="row" width="100%">
          <div className="col-xs-6" width="50%">
            <h1>{title}</h1>
            <ProfileViewInfo />
          </div>
          <div className="col-xs-6" width="50%">
            <div className="row m-2">
              <div className="col-lg-12">
                <Link to={LOBBY_ROUTE} className="btn btn-primary mt-1">Create Room</Link>
              </div>
              <div className="col-lg-12">
                <button type="button" role="button" data-toggle="modal" data-target=".join-group-modal" className="btn btn-primary mt-1"> Join Room </button>
              </div>
            </div>
          </div>
        </div>
        <JoinGroupModal handleClick={this.redirect.bind(this)} />
      </div>
    )
  }
}

export default ProfileViewPage
