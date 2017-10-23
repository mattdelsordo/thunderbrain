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

import App from './app'
import helloReducer from './reducer/hello'
import { APP_CONTAINER_SELECTOR } from '../shared/config'
import { isProd } from '../shared/util'

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = (isProd ? null : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

// create Redux store and enhance Redux with redux-thunk so it can do async stuff
const store = createStore(
  combineReducers({ hello: helloReducer }),
  composeEnhancers(applyMiddleware(thunkMiddleware)),
)

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

// wraps app in hotloader and React-Redux's Provider and pass the store to it
const wrapApp = (AppComponent, reduxStore) =>
  (
    <Provider store={reduxStore}>
      <AppContainer>
        <AppComponent />
      </AppContainer>
    </Provider>
  )

ReactDOM.render(wrapApp(App, store), rootEl)

if (module.hot) {
  // f-disable
  module.hot.accept('./app', () => {
    // eslint-disable-next-line global-require
    const NextApp = require('./app').default
    ReactDOM.render(wrapApp(NextApp, store), rootEl)
  })
}
