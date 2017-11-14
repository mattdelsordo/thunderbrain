import React from 'react'
import { STATIC_PATH } from '../config'

const path = `${STATIC_PATH}/res/profile_default.jpg`

const ProfileViewInfo = () =>
  (
    <div className=".d-inline-block" >
      <img src={path} alt="Profile" height="200" width="200" />
      <p>Username: halflingRogue</p>
      <p>First Name: Bilbo</p>
      <p>Last Name: Baggins</p>
    </div>
  )

export default ProfileViewInfo
