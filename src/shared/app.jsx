// @flow

/**
 * Defines app layout and behavior
 */

import React from 'react'
import { Switch } from 'react-router'
import { Route } from 'react-router-dom'
import Helmet from 'react-helmet'

import { APP_NAME } from './config'
import Nav from './component/nav'
import HelloPage from './component/page/hello'
import HelloAsyncPage from './component/page/hello-async'
import NotFoundPage from './component/page/not-found'
import ProfileViewPage from './component/page/profile-view'
import ProposalPage from './component/page/proposal'
import VideoChatPage from './component/page/video-chat-page'
import SignInPage from './component/page/sign-in'
import StoryboardPage from './component/page/storyboard'
import CommercialPage from './component/page/commercial-page'
import {
  HOME_PAGE_ROUTE,
  HELLO_PAGE_ROUTE,
  HELLO_ASYNC_PAGE_ROUTE,
  PROFILE_VIEW,
  PROPOSAL_ROUTE,
  CHAT_ROUTE,
  STORYBOARD_ROUTE,
  COMMERCIAL_ROUTE,
} from './routes'

const App = () =>
  (
    <div style={{ paddingTop: 54 }}>
      <Helmet titleTemplate={`%s | ${APP_NAME}`} defaultTitle={APP_NAME} />
    
      <Switch>
        <Route exact path={HOME_PAGE_ROUTE} render={() => <SignInPage />} />
        <Route path={HELLO_PAGE_ROUTE} render={() => <HelloPage />} />
        <Route path={HELLO_ASYNC_PAGE_ROUTE} render={() => <HelloAsyncPage />} />
        <Route path={PROFILE_VIEW} render={() => <ProfileViewPage />} />
        <Route path={PROPOSAL_ROUTE} render={() => <ProposalPage />} />
        <Route path={CHAT_ROUTE} render={() => <VideoChatPage />} />
        <Route path={STORYBOARD_ROUTE} render={() => <StoryboardPage />} />
        <Route path={COMMERCIAL_ROUTE} render={() => <CommercialPage />} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  )

export default App
