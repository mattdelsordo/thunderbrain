// @flow

/**
 * Merges plain JS object from the controller into a default
 * Redux state full of immutable objects
 */

import Immutable from 'immutable'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import helloReducer from '../shared/reducer/hello'

const initStore = (plainPartialState: ?Object) => {
  const preloadedState = plainPartialState ? {} : undefined

  if (plainPartialState && plainPartialState.hello) {
    // flow-disable-next-line
    preloadedState.hello = helloReducer(undefined, {})
      .merge(Immutable.fromJS(plainPartialState.hello))
  }

  return createStore(
    combineReducers({ hello: helloReducer }),
    preloadedState, applyMiddleware(thunkMiddleware),
  )
}

export default initStore
