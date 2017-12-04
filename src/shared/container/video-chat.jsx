// @flow

import React from 'react'
import jQuery from 'jquery'
import Video from 'twilio-video'

// Attach tracks to the DOM
const attachTracks = (tracks, container) => {
  tracks.forEach((track) => {
    container.appendChild(track.attach())
  })
}

// Detach the tracks from the DOM
const detachTracks = (tracks) => {
  tracks.forEach((track) => {
    track.detach().forEach((detachedElement) => {
      detachedElement.remove()
    })
  })
}

// Attach Participants tracks to the DOM
const attachParticipantTracks = (participant, container) => {
  const tracks = Array.from(participant.tracks.values())
  attachTracks(tracks, container)
}

// Detach Participants tracks from DOM
const detachParticipantTracks = (participant) => {
  const tracks = Array.from(participant.tracks.values())
  detachTracks(tracks)
}

class VideoChat extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeRoom: null,
      previewTracks: null,
      identity: null,
      roomID: props.roomID,
      checkVideoMsg: props.checkVideoMsg,
    }

    if (props.roomID) jQuery.getJSON('/token', this.processToken)
    else alert('ERROR: Invalid room ID!')
  }

  // Disconnect from room if this gets unmounted
  componentWillUnmount() {
    this.leaveRoomIfJoined()
  }

  // Function to pass to json call because we need to call bind on it
  processToken = (data) => {
    this.setState({ identity: data.identity })
    this.joinRoom(data)
  }

  joinRoom = (data) => {
    console.log(`Joining room '${this.state.roomID}'...`)
    const connectOptions = {
      name: this.state.roomID,
      logLevel: 'debug',
    }

    if (this.state.previewTracks) {
      connectOptions.tracks = this.state.previewTracks
    }

    Video.connect(data.token, connectOptions).then(this.roomJoined, (error) => {
      console.log(`Could not connect to Twilio: ${error.message}`)
    })
  }

  leaveRoom = () => {
    console.log('Leaving room...')
    this.state.activeRoom.disconnect()
  }

  // Successfully joined!
  roomJoined = (room) => {
    window.room = room
    this.setState({ activeRoom: room })

    console.log(`Joined as '${this.state.identity}'`)

    // Attach LocalParticipant's Tracks, if not already done
    const previewContainer = document.getElementById('media')
    if (!previewContainer.querySelector('video')) {
      attachParticipantTracks(room.localParticipant, previewContainer)
    }

    // Attach the Tracks of the Room's Participants.
    room.participants.forEach((participant) => {
      const steviewContainer = document.getElementById('media')
      attachParticipantTracks(participant, steviewContainer)
    })

    // When a Participant joins the Room, log the event.
    room.on('participantConnected', (participant) => {
      console.log(`Joining: '${participant.identity}'`)
    })

    // When a Participant adds a Track, attach it to the DOM.
    room.on('trackAdded', (track, participant) => {
      console.log(`${participant.identity} added track: ${track.kind}`)
      const steviewContainer = document.getElementById('media')
      attachTracks([track], steviewContainer)
    })

    // When a Participant removes a Track, detach it from the DOM.
    room.on('trackRemoved', (track, participant) => {
      console.log(`${participant.identity} removed track: ${track.kind}`)
      detachTracks([track])
    })

    // When a Participant leaves the Room, detach its Tracks.
    room.on('participantDisconnected', (participant) => {
      console.log(`Participant '${participant.identity} left the room`)
      detachParticipantTracks(participant)
    })

    // Once the LocalParticipant leaves the room, detach the Tracks
    // of all Participants, including that of the LocalParticipant.
    room.on('disconnected', () => {
      console.log('Left')
      if (this.state.previewTracks) {
        this.state.previewTracks.forEach((track) => {
          track.stop()
        })
      }
      detachParticipantTracks(room.localParticipant)
      room.participants.forEach(detachParticipantTracks)
      this.setState({ activeRoom: null })
    })
  }

  // Preview LocalParticipant's Tracks.
  previewCamera = () => {
    const localTracksPromise = this.state.previewTracks
      ? Promise.resolve(this.state.previewTracks)
      : Video.createLocalTracks()

    localTracksPromise.then((tracks) => {
      window.previewTracks = tracks
      this.setState({ previewTracks: tracks })
      const previewContainer = document.getElementById('media')
      if (!previewContainer.querySelector('video')) {
        attachTracks(tracks, previewContainer)
      }
    }, (error) => {
      console.error('Unable to access local media', error)
    })
  }

  // Leave Room
  leaveRoomIfJoined = () => {
    if (this.state.activeRoom) {
      this.state.activeRoom.disconnect()
    }
  }

  render() {
    if (!this.state.roomID) {
      return (
        <div>
          ERROR: Invalid room ID
        </div>
      )
    }

    return (
      <div>
        <div className="row">
          <div className="col">
            {this.state.checkVideoMsg &&
              <h5>Make sure that your video chat is working!</h5>
            }
          </div>
          <div className="col text-right">
            Room: {this.state.roomID}
          </div>
        </div>
        <div id="media" />
      </div>
    )
  }
}

export default VideoChat
