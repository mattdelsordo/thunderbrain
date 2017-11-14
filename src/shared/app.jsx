// @flow

/**
 * Defines app layout and behavior
 */

import React from 'react'
import { Switch } from 'react-router'
import { Route, Redirect } from 'react-router-dom'
import Helmet from 'react-helmet'

import { APP_NAME } from './config'
import Nav from './component/nav'
import Home from './component/page/home'
import HelloPage from './component/page/hello'
import HelloAsyncPage from './component/page/hello-async'
import NotFoundPage from './component/page/not-found'
import ProfileViewPage from './component/page/profile-view'
import ProposalPage from './component/page/proposal'
import VideoChatPage from './component/page/video-chat-page'
import SignInPage from './component/page/sign-in'
import SignUpPage from './component/page/register'
import StoryboardPage from './component/page/storyboard'
import CommercialPage from './component/page/commercial-page'
import LobbyPage from './component/page/lobby-page'
import BrainstormPhase from './component/page/brainstorm-phase'
import {
  HOME_PAGE_ROUTE,
  // HELLO_PAGE_ROUTE,
  // HELLO_ASYNC_PAGE_ROUTE,
  PROFILE_VIEW,
  PROPOSAL_ROUTE,
  CHAT_ROUTE,
  STORYBOARD_ROUTE,
  COMMERCIAL_ROUTE,
  BRAINSTORM_ROUTE,
  DEFAULT_ROUTE,
  LOBBY_ROUTE,
} from './routes'

const App = () =>
  (
    <div style={{ paddingTop: 54 }}>
      <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
      <Switch>
        <Route exact path={DEFAULT_ROUTE} render={() => <Redirect to={HOME_PAGE_ROUTE} />} />
        <Route exact path={HOME_PAGE_ROUTE} render={() => <SignUpPage />} />
        <Route path={PROFILE_VIEW} render={() => <ProfileViewPage />} />
        <Route path={PROPOSAL_ROUTE} render={() => <ProposalPage />} />
        <Route path={CHAT_ROUTE} render={() => <VideoChatPage />} />
        <Route path={STORYBOARD_ROUTE} render={() => <StoryboardPage />} />
        <Route path={COMMERCIAL_ROUTE} render={() => <CommercialPage />} />
        <Route path={LOBBY_ROUTE} render={() => <LobbyPage />} />
        <Route path={BRAINSTORM_ROUTE} render={() => <BrainstormPhase />} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  )

export default App
