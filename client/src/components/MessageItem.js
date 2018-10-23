import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import defaultProfileImage from '../images/default-profile-image.jpg';

const MessageItem = ({ date, text, username, profileImageUrl, removeMessage, isCorrectUser }) => (
    <li className="list-group-item">
      <img src={profileImageUrl || defaultProfileImage} alt={username} height="100" width="100" className="timeline-image"/>
      <div className="message-area">
        <Link to='/'>@{username} </Link>
        <span className="text-muted">
          <Moment className="text-muted" format="Do MMM YYYY">{date}</Moment>
        </span>
        <p>{text}</p>
        { isCorrectUser && (
          <button className="btn btn-danger" onClick={removeMessage}>Delete</button>
        )}
      </div>
    </li>
);

export default MessageItem;