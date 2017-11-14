import React from 'react'

class SignUpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmpassword: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    const newState = {}

    newState[e.target.name] = e.target.value

    this.setState(newState)
  }
  handleSubmit(e) {
    e.preventDefault()
    if (this.state.password === this.state.confirmpassword) {
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
          type="text"
          placeholder="email"
          required
          name="email"
          onChange={this.handleChange}
          value={this.state.email}
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
