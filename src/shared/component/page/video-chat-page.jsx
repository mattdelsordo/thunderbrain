import React from 'react'
import ReactDOM from 'react-dom'
import Helmet from 'react-helmet'
import Video from 'twilio-video'
let $ = require('jQuery')

import ConversationContainer from '../conversation-container'
import Button from '../button'

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
        $.getJSON('/token', (data) {
            let id = data.identity
            this.refs.controls.style.display = 'block'
        })
    }
    
    // Attach tracks to the DOM
    attachTracks(tracks, container) {
        tracks.forEach((track) => {
            container.appendChild(track.attach())
        })
    }

    // Attach Participants tracks to the DOM
    atttachParticipantTracks(participant, container) {
        const tracks = Array.from(participant.tracks.values())
        attachTracks(tracks, container)
    }

    // Detach the tracks from the DOM
    detachTracks(tracks) {
        tracks.forEach((track) {
            track.detach().forEach((detachedElement) {
                detachedElement.remove()
            })
        })
    }

    // Detach Participants tracks from DOM
    detachParticipantTracks(participant) {
        const tracks = Array.fron(participant.tracks.values())
        detachTracks(tracks)
    }

    // Disconnect from room if this gets unmounted
    componentWillUnmount() {
        leaveRoomIfJoined()
    }

    render() {
        return (
            <div id="remote-media"></div>
            <div id="controls">
                <div id="preview">
                    <p class="instructions">Hello Beautiful</p>
                    <div id="local-media"></div>
                    <Button label="Preview My Camera" onClick={preview_camera}/>
                </div>
                <div id="room-controls">
                    <p class="instructions">Room Name:</p>
                    <input id="room-name" type="text" placeholder="Enter a room name" />
                    <button id="button_join">Join Room</button>
                    <button id="button_leave">Leave Room</button>
                </div>
                <div id="log"></div>
            </div>
        )
    }
    
}

export default VideoChatPage
