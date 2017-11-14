// @flow

import React from 'react'
import Helmet from 'react-helmet'
import ProfileViewInfo from '../profile-view-info'
import Nav from '../nav'

const title = 'Profile View'

const ProfileViewPage = () =>
  (
    <div className="container mt-4">
      <Helmet
        title={title}
        meta={[
                    { name: 'description', content: 'A page to view your profile' },
                    { property: 'og:title', content: title },
                ]}
      />
      <Nav />
      <div className="row">
        <div className="col-12">
          <h1>{title}</h1>
          <ProfileViewInfo />
        </div>
      </div>
    </div>
  )

export default ProfileViewPage
