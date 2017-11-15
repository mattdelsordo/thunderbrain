import React from 'react'
import io from 'socket.io-client';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      confirmpassword: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.socket = io('localhost:8080');
  }
  handleChange(e) {
    const newState = {}

    newState[e.target.name] = e.target.value

    this.setState(newState)
  }
  handleSubmit(e) {
    e.preventDefault()
    if (this.state.password === this.state.confirmpassword) {
      this.socket.emit('create_user', {
        Username: this.state.username,
        Password: this.state.password,
      })
      alert("You've submitted it!")
    } else {
      alert("You're passwords don't match!")
    }
  }

  render() {
    return (
      <form
        className="react-form"
        onSubmit={this.handleSubmit}
      >
        <input
          className="form-control"
          type="text"
          placeholder="user name"
          required
          name="username"
          onChange={this.handleChange}
          value={this.state.username}
        />
        <input
          className="form-control"
          type="password"
          placeholder="password"
          required
          name="password"
          onChange={this.handleChange}
          value={this.state.password}
        />
        <input
          className="form-control"
          type="password"
          placeholder="confirm password"
          required
          name="confirmpassword"
          onChange={this.handleChange}
          value={this.confirmpassword}
        />
        <button
          className="btn btn-primary"
          type="submit"
        >
                        Sign Up
        </button>
      </form>
    )
  }
}

export default SignUpForm
