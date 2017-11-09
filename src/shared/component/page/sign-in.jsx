import React from 'react'
import Helmet from 'react-helmet'
import SignInForm from '../sign-in-form'

const title = 'Sign In'

const SignInPage = () =>
  (
    <div className="container mt-4">
      <Helmet
        title={title}
        meta={[
                    { name: 'description', content: 'A page to sign in from' },
                    { property: 'og:title', content: title },
                ]}
      />
      <div className="row">
        <div className="col-12">
          <h1>{title}</h1>
          <SignInForm />
          <br />
                    Need an account?
        </div>
      </div>
    </div>
  )

export default SignInPage
