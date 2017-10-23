// @flow

/**
 * Function that accepts the app title and injects it
 * into html to display the webpage
 */

import { STATIC_PATH } from '../shared/config'

const renderApp = (title: string) =>
  `
  <!doctype html>
  <html>
    <head>
      <title>${title}</title>
      <link rel="stylesheet" href="${STATIC_PATH}/css/style.css">
    </head>
    <body>
      <h1>${title}</h1>
    </body>
  </html>
  `

export default renderApp
