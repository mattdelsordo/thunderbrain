// @flow

import React from 'react'
import Helmet from 'react-helmet'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import Clock from '../../clock'
import AppNav from '../../../container/app-nav'
import VideoChat from '../../../container/video-chat'
import {
  BRAINSTORM_ROUTE,
  SIGN_IN_ROUTE,
  PROFILE_VIEW,
  LOBBY_ROUTE,
  RESULTS_ROUTE,
} from '../../../routes'
import {
  LOBBY,
  BRAINSTORM,
  DELIBERATION,
  RESULTS,
} from '../../../phases'
import { NO_SESSION, NO_USER } from '../../../redirect'
import VotingButton from '../../../container/voting-button'
import {addDeliberationTime, leaveRoom, setDeliberationTime, setDelibTime} from '../../../action/actions'

const mapStateToProps = (state) => {
  const user = state.hello.get('user')
  const session = state.hello.get('session')

  if (!user) {
    return {
      redirect: NO_USER,
    }
  } else if (!session) {
    return {
      redirect: NO_SESSION,
    }
  }
  return {
    roomID: session.get('roomID'),
    topic: session.get('topic'),
    members: session.get('members'),
    ideas: session.get('ideas'),
    phase: session.get('phase'),
    deliberationSeconds: session.get('deliberationSeconds'),
    host: session.get('host'),
    username: user.get('name'),
  }
}

const DeliberationPage = ({
  dispatch,
  roomID,
  topic,
  members,
  ideas,
  deliberationSeconds,
  username,
  host,
  phase,
  redirect,
}: Props) => {
  const title = `Deliberations | ${topic}`

  if (redirect === NO_USER) return (<Redirect to={SIGN_IN_ROUTE} />)
  else if (redirect === NO_SESSION) return (<Redirect to={PROFILE_VIEW} />)
  else if (phase === LOBBY) return (<Redirect to={LOBBY_ROUTE} />)
  else if (phase === BRAINSTORM) return (<Redirect to={BRAINSTORM_ROUTE} />)
  else if (phase === RESULTS) return (<Redirect to={RESULTS_ROUTE} />)
  else if (phase === DELIBERATION) {
    if (deliberationSeconds > 0) {
      return (
        <div>
          <Helmet
            title={title}
            meta={[
              { name: 'description', constent: title },
              { property: 'og:title', content: title },
            ]}
          />
          <AppNav />
          <div className="container">
            <div className="row">
              <h1 className="mt-3">{`Prompt: "${topic}"`}</h1>
            </div>
            <div className="row">
              <Clock time={deliberationSeconds} />
            </div>
            <div className="row mt-3 mb-3">
              {ideas.map((idea, i) => <VotingButton key={i} idea={idea} totalMembers={members.length} user={username} roomID={roomID} />)}
            </div>
            <div className="row">
              <VideoChat roomID={roomID} />
            </div>
          </div>
        </div>
      )
    }

    else {
      const results = ideas.sort((a, b) => {
        if (a.get('points').size > b.get('points').size) return -1
        else if (a.get('points').size < b.get('points').size) return 1
        return 0
      }).filter((idea, i) => {
        return i < 5 && idea.get('points').size > 0
      })

      return (
        <div>
          <Helmet
            title={title}
            meta={[
              { name: 'description', constent: title },
              { property: 'og:title', content: title },
            ]}
          />
          <AppNav />
          <div className="container">
            <div className="row">
              <h1 className="mt-3">{`Prompt: "${topic}"`}</h1>
            </div>
            <div className="row">
              <Clock time={deliberationSeconds} />
              {username === host &&
              <button
                className="btn btn-primary m-3"
                onClick={() => { dispatch(addDeliberationTime(roomID)) }}
              >
                30 More Seconds?
              </button>}
              {/*<button onClick={() => dispatch(leaveRoom())} className="btn btn-primary m-3">Exit Call</button>*/}
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdhTWqdMZ-yeLi1o4SFUhJQ3OhAC2MW_7MVjQxgcplyPDC20w/viewform?usp=sf_link"
                target="_blank"
                rel="noopener"
                onClick={() => dispatch(leaveRoom())}
                className="btn btn-primary m-3"
              >
                Exit Call
              </a>
            </div>
            <div className="col">
              <h4>Results:</h4>
              <ol className="list-group">
                {
                  ((results.length > 0)
                  ? results.map((idea, i) => (<li key={i} className="list-group-item">{`${idea.get('text')} +${idea.get('points').size}`}</li>))
                  : <h3>Nothing!</h3>)
                }
              </ol>
            </div>
            <div className="row">
              <VideoChat roomID={roomID} />
            </div>
          </div>
        </div>
      )
    }

  }
  console.log('ERROR: invalid redirect in lobby page')
  return (<Redirect to={PROFILE_VIEW} />)
}


export default connect(mapStateToProps)(DeliberationPage)
