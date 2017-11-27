// @flow

/**
 * Entry point for the client
 */

// lets you use most recent JS features in client code
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { BrowserRouter } from 'react-router-dom'
import Immutable from 'immutable'
import $ from 'jquery'
import Tether from 'tether'

import App from '../shared/app'
import helloReducer from '../shared/reducer/reducer'
import { APP_CONTAINER_SELECTOR } from '../shared/config'
import { isProd } from '../shared/util'
import { setUpSocket, sessionMiddleware } from './socket'

// load bootstrap
window.jQuery = $
window.Tether = Tether
require('bootstrap')

/* eslint-disable no-underscore-dangle */
const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const preloadedState = window.__PRELOADED_STATE__
/* eslint-enable no-underscore-dangle */

// create Redux store and enhance Redux with redux-thunk so it can do async stuff
// feed client-side store with preloadedState from the server
const store = createStore(
  combineReducers({ hello: helloReducer }),
  { hello: Immutable.fromJS(preloadedState.hello) },
  composeEnhancers(applyMiddleware(thunkMiddleware), applyMiddleware(sessionMiddleware)),
)

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

// wraps app in hotloader and React-Redux's Provider and pass the store to it
const wrapApp = (AppComponent, reduxStore) =>
  (
    <Provider store={reduxStore}>
      <BrowserRouter>
        <AppContainer>
          <AppComponent />
        </AppContainer>
      </BrowserRouter>
    </Provider>
  )

ReactDOM.render(wrapApp(App, store), rootEl)

if (module.hot) {
  // f-disable
  module.hot.accept('../shared/app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('../shared/app').default
    ReactDOM.render(wrapApp(NextApp, store), rootEl)
  })
}

setUpSocket(store)
