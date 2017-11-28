import React from 'react'
import { STATIC_PATH } from '../config'

const defaultPath = `${STATIC_PATH}/res/profile_default.jpg`

const ProfileViewInfo = ({username, photoPath} : Props) =>
  (
    <div className=".d-inline-block" >
      <h2 className="display-4">{username || 'NO PROFILE FOUND'} </h2>
      <img src={photoPath || defaultPath} alt="Profile" height="200" width="200" />
    </div>
  )

export default ProfileViewInfo
