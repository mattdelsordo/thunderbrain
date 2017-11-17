// @flow

export const DEFAULT_ROUTE = '/'
export const HOME_PAGE_ROUTE = '/info'
export const HELLO_PAGE_ROUTE = '/hello'
export const HELLO_ASYNC_PAGE_ROUTE = '/hello-async'
export const NOT_FOUND_DEMO_PAGE_ROUTE = '/404'
export const PROFILE_VIEW = '/app/profile'
export const PROPOSAL_ROUTE = '/info/proposal'
export const CHAT_ROUTE = '/app/chat'
export const STORYBOARD_ROUTE = '/info/storyboard'
export const COMMERCIAL_ROUTE = '/info/commercial'
export const LOBBY_ROUTE = '/app/lobby'
export const BRAINSTORM_ROUTE = '/app/brainstorm'
export const SIGN_IN_ROUTE = '/app/login'
export const REGISTER_ROUTE = '/app/register'
export const GUEST_ROUTE = '/app/guest'

export const helloEndpointRoute = (num: ?number) => `/ajax/hello/${num || ':num'}`
