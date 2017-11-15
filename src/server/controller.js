// @flow

import User from '../../models/User'

/**
 * Controller with hard-coded results.jsx to facilitate MVC paradigm
 * Apparently this is where business logic and database calls are meant to be made
 */

export const homePage = () => null

export const signUpPage = () => ({
  hello: { message: 'Server-side sign up message' },
})

export const helloPage = () => ({
  hello: { message: 'Server-side preloaded message' },
})

export const helloAsyncPage = () => ({
  hello: { messageAsync: 'Server-side preloaded message for async page' },
})

export const helloEndpoint = (num: number) => ({
  serverMessage: `Hello from the server! (received ${num})`,
})

export const proposalPage = () => ({
  hello: { message: 'Preloaded proposal message' },
})

export const chatPage = () => ({
  hello: { message: 'Welcome to the chat page' },
})
