import React from 'react'
import Helmet from 'react-helmet'
import Video from 'twilio-video'
import jQuery from 'jquery'

import Button from '../button'
import { STATIC_PATH } from '../../config'

const title = 'Video Chat'

/**
 * state:
 *  activeRoom
 *  previewTracks
 *  identity
 *  roomName
 */

class VideoChatPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeRoom: null,
      previewTracks: null,
      identity: null,
      roomName: null,
    }

    jQuery.getJSON('/token', this.processToken.bind(this))
  }

  // Attach tracks to the DOM
  attachTracks(tracks, container) {
    tracks.forEach((track) => {
      container.appendChild(track.attach())
    })
  }

  // Attach Participants tracks to the DOM
  attachParticipantTracks(participant, container) {
    const tracks = Array.from(participant.tracks.values())
    attachTracks(tracks, container)
  }

  // Detach the tracks from the DOM
  detachTracks(tracks) {
    tracks.forEach((track) => {
      track.detach().forEach((detachedElement) => {
        detachedElement.remove()
      })
    })
  }

  // Detach Participants tracks from DOM
  detachParticipantTracks(participant) {
    const tracks = Array.from(participant.tracks.values())
    this.detachTracks(tracks)
  }

  // Disconnect from room if this gets unmounted
  componentWillUnmount() {
    this.leaveRoomIfJoined()
  }

  // Activity log.
  log(message) {
    const logDiv = document.getElementById('log')
    logDiv.innerHTML += `<p>&gt;&nbsp;${message}</p>`
    logDiv.scrollTop = logDiv.scrollHeight
  }

  // Function to pass to json call because we need to call bind on it
  processToken(data) {
    console.log('processing token....')
    this.setState({ identity: data.identity })
    document.getElementById('room-controls').style.display = 'block'

    // Bind join room button
    document.getElementById('button-join').onclick = function () {
      this.setState({ roomName: document.getElementById('room-name').value })
      if (!this.state.roomName) {
        alert('Please enter a room name.')
        return
      }

      this.log(`Joining room '${this.state.roomName}'...`)
      const connectOptions = {
        name: this.state.roomName,
        logLevel: 'debug',
      }

      if (this.state.previewTracks) {
        connectOptions.tracks = this.state.previewTracks
      }

      Video.connect(data.token, connectOptions).then(this.roomJoined.bind(this), (error) => {
        this.log(`Could not connect to Twilio: ${error.message}`)
      })
    }.bind(this)

    // bind leave room button
    document.getElementById('button-leave').onclick = function () {
      this.log('Leaving room...')
      this.state.activeRoom.disconnect()
    }.bind(this)

    console.log('made it to the end of process token')
  }

  // Successfully joined!
  roomJoined(room) {
    window.room = room
    this.setState({ activeRoom: room })

    this.log(`Joined as '${this.state.identity}'`)
    document.getElementById('button-join').style.display = 'none'
    document.getElementById('button-leave').style.display = 'inline'

    // Attach LocalParticipant's Tracks, if not already done
    const previewContainer = document.getElementById('local-media')
    if (!previewContainer.querySelector('video')) {
      this.attachParticipantTracks(room.localParticipant, previewContainer)
    }

    // Attach the Tracks of the Room's Participants.
    room.participants.forEach((participant) => {
      this.log(`Already in Room: '${participant.identity}'`)
      const steviewContainer = document.getElementById('remote-media')
      this.attachParticipantTracks(participant, steviewContainer)
    })

    // When a Participant joins the Room, log the event.
    room.on('participantConnected', (participant) => {
      this.log(`Joining: '${participant.identity}'`)
    })

    // When a Participant adds a Track, attach it to the DOM.
    room.on('trackAdded', (track, participant) => {
      this.log(`${participant.identity} added track: ${track.kind}`)
      const steviewContainer = document.getElementById('remote-media')
      this.attachTracks([track], steviewContainer)
    })

    // When a Participant removes a Track, detach it from the DOM.
    room.on('trackRemoved', (track, participant) => {
      this.log(`${participant.identity} removed track: ${track.kind}`)
      this.detachTracks([track])
    })

    // When a Participant leaves the Room, detach its Tracks.
    room.on('participantDisconnected', (participant) => {
      this.log(`Participant '${participant.identity} left the room`)
      this.detachParticipantTracks(participant)
    })

    // Once the LocalParticipant leaves the room, detach the Tracks
    // of all Participants, including that of the LocalParticipant.
    room.on('disconnected', () => {
      this.log('Left')
      if (this.state.previewTracks) {
        this.state.previewTracks.forEach((track) => {
          track.stop()
        })
      }
      this.detachParticipantTracks(room.localParticipant)
      room.participants.forEach(this.detachParticipantTracks)
      this.setState({ activeRoom: null })
      document.getElementById('button-join').style.display = 'inline'
      document.getElementById('button-leave').style.display = 'none'
    })
  }

  // Preview LocalParticipant's Tracks.
  previewCamera() {
    const localTracksPromise = this.state.previewTracks
      ? Promise.resolve(this.state.previewTracks)
      : Video.createLocalTracks()

    localTracksPromise.then((tracks) => {
      window.previewTracks = tracks
      this.setState({ previewTracks: tracks })
      const previewContainer = document.getElementById('local-media')
      if (!previewContainer.querySelector('video')) {
        this.attachTracks(tracks, previewContainer)
      }
    }, (error) => {
      console.error('Unable to access local media', error)
      this.log('Unable to access Camera and Microphone')
    })
  }

  // Leave Room
  leaveRoomIfJoined() {
    if (this.state.activeRoom) {
      this.state.activeRoom.disconnect()
    }
  }

  render() {
    return (
      <div>
        <Helmet
          title={title}
          meta={[
            { name: 'description', constent: 'Video Chat Test' },
            { property: 'og:title', content: title },
          ]}
        />
        <div className="row">
          <div className="col-12">
            <h1>{title}</h1>

            <div id="remote-media" />
            <div id="controls">
              <div id="preview">
                <p className="instructions">Hello Beautiful</p>
                <div id="local-media" />
                <Button label="Preview My Camera" handleClick={this.previewCamera.bind(this)} />
              </div>
              <div id="room-controls">
                <p className="instructions" >Room Name:</p>
                <input id="room-name" type="text" placeholder="Enter a room name" />
                <button id="button-join">Join Room</button>
                <button id="button-leave">Leave Room</button>
              </div>
              <div id="log" />
              
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default VideoChatPage
