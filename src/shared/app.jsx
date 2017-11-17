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
import Home from './component/page/info/home'
import HelloPage from './component/page/app/hello'
import HelloAsyncPage from './component/page/app/hello-async'
import NotFoundPage from './component/page/not-found'
import ProfileViewPage from './component/page/app/profile-view'
import ProposalPage from './component/page/info/proposal'
import VideoChatPage from './component/page/app/voting-page'
import StoryboardPage from './component/page/info/storyboard'
import CommercialPage from './component/page/info/commercial-page'
import LobbyPage from './component/page/app/lobby-page'
import SignUpPage from './component/page/app/register'
import SignInPage from './component/page/app/sign-in'
import GuestSignInPage from './component/page/app/guest-sign-in'
import BrainstormPhase from './component/page/app/brainstorm-phase'
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
  SIGN_IN_ROUTE,
  REGISTER_ROUTE,
  GUEST_ROUTE
} from './routes'

const App = () =>
  (
    <div style={{ paddingTop: 54 }}>
      <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
      <Switch>
        <Route exact path={DEFAULT_ROUTE} render={() => <Redirect to={HOME_PAGE_ROUTE} />} />
        <Route exact path={HOME_PAGE_ROUTE} render={() => <Home />} />
        <Route path={PROFILE_VIEW} render={() => <ProfileViewPage />} />
        <Route path={PROPOSAL_ROUTE} render={() => <ProposalPage />} />
        <Route path={CHAT_ROUTE} render={() => <VideoChatPage />} />
        <Route path={STORYBOARD_ROUTE} render={() => <StoryboardPage />} />
        <Route path={COMMERCIAL_ROUTE} render={() => <CommercialPage />} />
        <Route path={LOBBY_ROUTE} render={() => <LobbyPage />} />
        <Route path={BRAINSTORM_ROUTE} render={() => <BrainstormPhase />} />
        <Route path={SIGN_IN_ROUTE} render={() => <SignInPage />} />
        <Route path={REGISTER_ROUTE} render={() => <SignUpPage />} />
        <Route path={GUEST_ROUTE} render={() => <GuestSignInPage />} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  )

export default App
