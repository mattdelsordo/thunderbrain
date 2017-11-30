// @flow

/**
 * Constants to configure the project
 */

export const WDS_PORT = 7000

export const APP_CONTAINER_CLASS = 'js-app'
export const APP_CONTAINER_SELECTOR = `.${APP_CONTAINER_CLASS}`

export const WEB_PORT = process.env.PORT || 8080
export const SOCKET_PATH = 'https://thunderbrain.herokuapp.com/'
export const STATIC_PATH = '/static'
export const APP_NAME = 'ThunderBrain'

// types of messages client and server will exchange
export const IO_CONNECT = 'connect'
export const IO_DISCONNECT = 'disconnect'
export const IO_CLIENT_HELLO = 'IO_CLIENT_HELLO'
export const IO_CLIENT_JOIN_ROOM = 'IO_CLIENT_JOIN_ROOM'
export const IO_SERVER_HELLO = 'IO_SERVER_HELLO'
export const IO_CREATE_USER = 'IO_CREATE_USER'
export const IO_USER_JOIN_ROOM = 'IO_USER_JOIN_ROOM'
export const IO_USER_JOIN_RESPONSE = 'IO_USER_JOIN_RESPONSE'
