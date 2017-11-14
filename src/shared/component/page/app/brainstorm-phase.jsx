import React from 'react'
import { Redirect } from 'react-router'

import { CHAT_ROUTE } from '../../../routes'
import Countdown from '../../countdown'

class BrainstormPhase extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      time: props.time || 10,
      question: props.question || 'What would be cool features to add to a spaceship?',
      ideas: [],
      redirect: false,
    }

    // document.getElementById('idea-field').focus()
  }

  // adds ideas to the current list
  submitIdea() {
    const field = document.getElementById('idea-field')
    if (field.value) {
      const { ideas } = this.state
      ideas.push(field.value)
      this.setState({
        ideas,
      })
      field.value = ''
    }
    field.focus()
  }

  end() {
    this.setState({ redirect: true })
  }

  render() {
    if (this.state.redirect) return <Redirect push to={CHAT_ROUTE} />

    return (
      <div className="container" width="100%">
        <div className="row">
          <div className="col-sm-6 p-4">
            <div className="jumbotron mh-100">
              <h3>Enter as many ideas as you can for the following question:</h3>
              <h4>{this.state.question}</h4>
              <Countdown time={'??:??'} />
            </div>
          </div>
          <div className="col-sm-6 p-4">
            <div className="input-group">
              <input id="idea-field" type="text" className="form-control" placeholder="Your next great idea" />
              <button className="input-group-addon" onClick={this.submitIdea.bind(this)}>Submit</button>
            </div>
            <ul className="list-group">
              {this.state.ideas.map((idea) => {
                return <li className="list-group-item" key={idea}>{idea}</li>
              })}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default BrainstormPhase
