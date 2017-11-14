import React from 'react'
import Helmet from 'react-helmet'
import SignUpForm from '../sign-up-form'
import Nav from '../nav'

const title = 'Sign Up'

class SignUpPage extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="container mt-4">
        <Helmet
          title={title}
          meta={[
                        { name: 'description', content: 'A page to sign in from' },
                        { property: 'og:title', content: title },
                    ]}
        />
        <Nav />
        <div className="row">
          <div className="col-12">
            <h1>{title}</h1>
            <SignUpForm />
            <br />
                        Need an account?
          </div>
        </div>
      </div>
    )
  }
}

export default SignUpPage
