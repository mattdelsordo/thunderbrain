// @flow

/**
 * Controller with hard-coded results to facilitate MVC paradigm
 * Apparently this is where business logic and database calls are meant to be made
 */

export const homePage = () => null

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
