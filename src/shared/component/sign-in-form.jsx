import React from 'react'
import io from 'socket.io-client'

class SignInForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.socket = io('localhost:8080')
  }
  handleChange(e) {
    const newState = {}

    newState[e.target.name] = e.target.value

    this.setState(newState)
  }
  handleSubmit(e) {
    e.preventDefault()
    this.socket.emit('log_in', {
      Username: this.state.username,
      Password: this.state.password,
    })
    alert("You've logged in!")
  }
  // redirectToProfileViewPage(e) {
  //   e.preventDefault();
  // window.location = 'my-app/src/Containers/HomePage.jsx';
  // }

  render() {
    return (
      <form
        className="react-form"
        onSubmit={this.handleSubmit}
      >
        <input
          className="form-control"
          type="text"
          required
          placeholder="user name"
          name="username"
          onChange={this.handleChange}
          value={this.state.username}
        />
        <input
          className="form-control"
          type="password"
          required
          placeholder="password"
          name="password"
          onChange={this.handleChange}
          value={this.state.password}
        />
        <button
          className="btn btn-primary"
          type="submit"
        >
                        Sign In
        </button>
      </form>
    )
  }
}

export default SignInForm
