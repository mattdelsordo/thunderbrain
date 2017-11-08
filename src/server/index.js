// @flow

/**
 * Entry point for the server
 */

import compression from 'compression'
import express from 'express'
import { Server } from 'http'
import socketIO from 'socket.io'

import routing from './routing'
import { WEB_PORT, STATIC_PATH } from '../shared/config'
import { isProd } from '../shared/util'
import setUpSocket from './socket'
import User from '../../models/User'
import randomname from '../shared/randomname'

require('dotenv').load() // load in twillio credentials

const AccessToken = require('twilio').jwt.AccessToken

const VideoGrant = AccessToken.VideoGrant

const app = express()

// const mongoose = require('mongoose')

// use Server from http to listen to incoming requests and not the Express app
// f-disable
const http = Server(app)
const io = socketIO(http)
setUpSocket(io)

// mongoose.connect('mongodb://<LudwigNova>:<thunderbrain>@ds229435.mlab.com:29435/thunderbraindatabase')
// mongoose.connection.on('error', () => {
//   console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?')
// })

// const db = mongoose.connection
// db.once('open', () => {
//   new User({ userName: 'Jason', firstName: 'Bob', lastName: 'Job' }).save()
// })

app.use(compression())
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('public'))

/**
 * Generate Token for chat user to connect to twilio
 */
app.get('/token', (req, res) => {
  const identity = randomname()

  // Create access token that gets signed and returned to the client
  const token = new AccessToken(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_API_KEY,
    process.env.TWILIO_API_SECRET,
  )

  // Assign generated identity to the token
  // This is also where a username will go
  token.identity = identity

  // Grant access token Twilio Video capabilities
  const grant = new VideoGrant()
  token.addGrant(grant)

  // Serialize token to a JWT string and include it in a JSON response
  res.send({
    identity,
    token: token.toJwt(),
  })
})

// call instead of implementing routing here
routing(app)

http.listen(WEB_PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' :
    '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`)
})
