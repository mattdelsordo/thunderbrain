// @flow

import React from 'react'
import { Redirect } from 'react-router'
import Helmet from 'react-helmet'
import { connect } from 'react-redux'

import {
  SIGN_IN_ROUTE,
  PROFILE_VIEW,
  CHAT_ROUTE,
  RESULTS_ROUTE,
  LOBBY_ROUTE,
} from '../../../routes'
import Countdown from '../../clock'
import IdeaList from '../../../container/idea-list'
import SubmitString from '../../../container/submit-string'
import {addIdea, beginDeliberations} from '../../../action/actions'
import AppNav from '../../../container/app-nav'
import {
  LOBBY,
  BRAINSTORM,
  DELIBERATION,
  RESULTS,
} from '../../../phases'
import { NO_SESSION, NO_USER } from '../../../redirect'

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
    brainstormSeconds: session.get('brainstormSeconds'),
    topic: session.get('topic'),
    phase: session.get('phase'),
  }
}

const BrainstormPhase = ({ brainstormSeconds, topic, redirect, phase, dispatch }: Props) => {
  if (redirect === NO_USER) return (<Redirect to={SIGN_IN_ROUTE} />)
  else if (redirect === NO_SESSION) return (<Redirect to={PROFILE_VIEW} />)
  else if (phase === LOBBY) return (<Redirect to={LOBBY_ROUTE} />)
  else if (phase === DELIBERATION) return (<Redirect to={CHAT_ROUTE} />)
  else if (phase === RESULTS) return (<Redirect to={RESULTS_ROUTE} />)
  else if (phase === BRAINSTORM) {
    return (
      <div className="container" width="100%">
        <Helmet
          title={`Brainstorm | ${topic}`}
          meta={[
            { name: 'description', content: topic },
            { property: 'og:title', content: topic },
          ]}
        />
        <AppNav />
        <div className="row">
          <div className="col-sm-6 p-4">
            <div className="jumbotron mh-100">
              <h4>Enter as many ideas as you can for the following topic:</h4>
              <h2>{topic}</h2>
              <Countdown time={brainstormSeconds} />
            </div>
          </div>
          <div className="col-sm-6 p-4">
            <IdeaList />
            <SubmitString placeholder="Your next great idea." buttonText="Add" action={addIdea} />
          </div>
        </div>

        <button
          onClick={() => { dispatch(beginDeliberations()) }}
        >
          DEBUG ONLY PLS COMMENT OUT
        </button>
      </div>
    )
  }

  console.log('ERROR: invalid redirect in lobby page')
  return (<Redirect to={PROFILE_VIEW} />)
}

export default connect(mapStateToProps)(BrainstormPhase)
