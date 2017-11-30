// @flow

import * as config from '../shared/config'
import { IO_CLIENT_JOIN_ROOM } from '../shared/config'
import { IO_USER_JOIN_ROOM } from '../shared/config'
import { IO_USER_JOIN_RESPONSE, IO_DISCONNECT } from '../shared/config'


const User = require('../../models/User')
const bcrypt = require('bcrypt')

const saltRounds = 10

const rooms = {}
const userToRoom = {}

/* eslint-disable no-console */
const setUpSocket = (io: Object) => {
  // when client connects get access to socket object
  io.on(config.IO_CONNECT, (socket) => {
    console.log('[socket.io] A client connected.')

    // // make client join the room it wants
    // socket.on(IO_CLIENT_JOIN_ROOM, (room) => {
    //   socket.join(room)
    //   console.log(`[socket.io] A client joined room ${room}.`)
    //
    //   io.emit(IO_SERVER_HELLO, 'Hello everyone!')
    //   io.to(room).emit(IO_SERVER_HELLO, `Hello clients of room ${room}!`)
    //   socket.emit(IO_SERVER_HELLO, 'Hello you!')
    // })

    socket.on(IO_CLIENT_JOIN_ROOM, (payload) => {
      socket.join(payload.roomID)
      console.log(`${payload.username} has connected to room ${payload.roomID}`)
      io.to(payload.roomID).emit(IO_USER_JOIN_ROOM, {
        username: payload.username,
        socketID: socket.id,
      })

      userToRoom[socket.id] = payload.roomID

      if (payload.roomID in rooms) {
        rooms[payload.roomID].userCount += 1
      } else {
        rooms[payload.roomID] = {
          ideas: [],
          userCount: 1,
          ideaShipmentCounter: 0,
        }
      }
    })

    socket.on(IO_DISCONNECT, () => {
      if (rooms[userToRoom[socket.id]]) {
        rooms[userToRoom[socket.id]].userCount -= 1
        rooms[userToRoom[socket.id]].ideaShipmentCounter -= 1

        if (rooms[userToRoom[socket.id]].userCount < 1) {
          rooms[userToRoom[socket.id]] = null
          console.log(`Deleted room ${userToRoom[socket.id]}`)
        }
      }
    })

    // After a user joins, all the other members send in their info
    socket.on(IO_USER_JOIN_ROOM, (payload) => {
      io.to(payload.roomID).emit(IO_USER_JOIN_RESPONSE, payload)
    })

    // log message in server console
    socket.on(config.IO_CLIENT_HELLO, (clientMessage) => {
      console.log(`[socket.io] Client: ${clientMessage}`)
    })

    // log disconnections
    socket.on(config.IO_DISCONNECT, (payload) => {
      socket.leaveAll()
      console.log(`${payload.username} disconnected.`)
    })

    // create a user in the database
    socket.on('create_user', (user) => {
      console.log('[socket.io] A user has been registered.')
      const hashedPassword = bcrypt.hashSync(user.Password, saltRounds)
      const newUser = User({
        username: user.Username,
        password: hashedPassword,
      })
      newUser.save()
    })

    // create a guest user in the database
    socket.on('create_guest_user', (user) => {
      console.log('[socket.io] A guest user has been registered.')
      const newUser = User({
        username: user.Username,
        password: 'guest',
      })
      newUser.save()
    })

    // log a user from the database into the site
    socket.on('log_in', (user) => {
      User.findOne({ username: user.Username }, 'password', (err, matchedUser) => {
        if (matchedUser != null) {
          console.log(matchedUser.password)
          console.log(user.Password)
          if (bcrypt.compareSync(user.Password, matchedUser.password) === true) {
            console.log('[socket.io] A user has been logged in.')
          } else {
            console.log('[socket.io] A user has tried to log in with incorrect credentials.')
          }
        } else {
          console.log('[socket.io] A user that does not exist has tried to log in.')
        }
      })
    })

    // send all members of a room to the brainstorming page
    socket.on('begin_brainstorm', (payload) => {
      console.log('[socket.io] Host has begun the brainstorm session')
      io.to(payload.roomID).emit('load_brainstorm_room', {
        brainstormTimeLimit: payload.brainstormTimeLimit,
        deliberationTimeLimit: payload.deliberationTimeLimit,
      })
      let brainStormTimer = Number(payload.brainstormTimeLimit)
      const brainTimer = setInterval(() => {
        brainStormTimer -= 1

        io.to(payload.roomID).emit('update_brainstorm_timer', {
          brainStormTimeLeft: brainStormTimer,
        })
        // console.log(`[socket.io] ${brainStormTimer}s left in the brainstorm session for room ${payload.roomID}`)

        if (brainStormTimer === 0) {
          clearInterval(brainTimer)
          console.log('Timer done!')
          io.to(payload.roomID).emit('collect_ideas')
        }
      }, 1000)
    })

    // sets up the server work for the deliberations page server-end socket
    socket.on('begin_deliberations', (payload) => {
      console.log('[socket.io] Host has begun the deliberation session')
      let deliberationTimer = Number(payload.deliberationTimeLeft)
      const delibTimer = setInterval(() => {
        deliberationTimer -= 1

        io.to(payload.roomID).emit('update_deliberation_timer', {
          deliberationTimeLeft: deliberationTimer,
        })
        // console.log(`[socket.io] ${deliberationTimer}s left in the deliberation session for room ${payload.roomID}`)

        if (deliberationTimer === 0) {
          clearInterval(delibTimer)
          console.log('Timer done!')
        }
      }, 1000)
    })

    socket.on('send_ideas', (payload) => {
      rooms[userToRoom[socket.id]].ideaShipmentCounter += 1
      const sentIdeas = []
      for (let i = 0; i < payload.userIdeas.length; i += 1) {
        sentIdeas.push(payload.userIdeas[i].text)
        rooms[userToRoom[socket.id]].ideas.push(payload.userIdeas[i].text)
      }
      console.log(`[socket.io] ${payload.username} sent the ideas: ${JSON.stringify((sentIdeas))}`)
      console.log(`[socket.io] All ideas so far: ${rooms[userToRoom[socket.id]].ideas} (${rooms[userToRoom[socket.id]].ideaShipmentCounter}/${rooms[userToRoom[socket.id]].userCount})`)
      if (rooms[userToRoom[socket.id]].ideaShipmentCounter === rooms[userToRoom[socket.id]].userCount) {
        console.log(`[socket.io] All ideas have been collected: ${rooms[userToRoom[socket.id]].ideas}`)
        io.to(payload.roomID).emit('load_deliberation_room', {
          ideasToRender: rooms[userToRoom[socket.id]].ideas,
        })
      }
    })

    socket.on('vote_made', (payload) => {
      socket.broadcast.to(payload.roomID).emit('update_votes', {
        idea: payload.ideaVoted,
        user: payload.userVoted,
      })
    })

    socket.on('add_to_deliberation_timer', (payload) => {
      let extraTime = 30
      const extraDelibTimer = setInterval(() => {
        extraTime -= 1

        io.in(payload.roomID).emit('update_deliberation_timer', {
          deliberationTimeLeft: extraTime,
        })

        if (extraTime === 0) {
          clearInterval(extraDelibTimer)
          console.log('Timer done!')
        }
      }, 1000)
    })
  })
}
/* eslint-enable no-console */

export default setUpSocket
