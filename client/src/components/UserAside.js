import React from 'react';
import defaultProfileImage from '../images/default-profile-image.jpg';

export default ({ username, profileImageUrl }) => (
  <aside className="col-sm-2">
    <div className="panel panel-default">
      <div className="panel-body">
        <img src={profileImageUrl || defaultProfileImage} alt={username} width="200" height="200"/>
      </div>
    </div>
  </aside>
);