import React from 'react'
import ReactDOM from 'react-dom'

class ConversationContainer extends React.Component {

    // Expects Twilio conversation passed in as a prop
    componentDidMount() {
        const convesation = this.props.conversation
        conversation.localMedia.attach(this.refs.localMedia)

        conversation.on('participantConnected', (participant) => {
            participant.media.attach(this.refs.remoteMedia)
        })
    }

    componentWillUnmount() {
        const conversation = this.props.conversation
        conversation.localMedia.stop()
        conversation.disconnect()
    }

    // Participant media gets attached to these two divs
    render() {
        return (
            <div>
                <div ref='remoteMedia' className='media-container'></div>
                <div ref='localMedia' className='media-container'></div>
            </div>
        )
    }
}

export default ConversationContainer
