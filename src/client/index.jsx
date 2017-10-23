// @flow

/**
 * Entry point for the client
 */

// lets you use most recent JS features in client code
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'

import App from './app'
import { APP_CONTAINER_SELECTOR } from '../shared/config'

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

// wraps app in hotloader
const wrapApp = AppComponent =>
  (
    <AppContainer>
      <AppComponent />
    </AppContainer>
  )

ReactDOM.render(wrapApp(App), rootEl)

if (module.hot) {
  // f-disable
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./app').default
    ReactDOM.render(wrapApp(NextApp), rootEl)
  })
}
