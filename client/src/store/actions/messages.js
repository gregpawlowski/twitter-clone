import { apiCall } from '../../services/api';
import { addError } from './errors';
import { LOAD_MESSAGES, REMOVE_MESSAGE } from '../actionTypes';

export const loadMessages = (messages) => ({
  type: LOAD_MESSAGES,
  messages
});

export const remove = id => ({
  type: REMOVE_MESSAGE,
  id
});

export const fetchMessages = () => {
  return dispatch => {
    return apiCall('get', '/api/messages')
      .then(res => dispatch(loadMessages(res)))
      .catch(err => addError(err.message));
  }
}

export const postNewMessage = text => {
  return (dispatch, getState) => {
    let { currentUser } = getState();
    const id = currentUser.user.id;
    return apiCall('post', `/api/users/${id}/messages`, { text })
      .then(res => {})
      .catch(err => addError(err.message));
  }
}

export const removeMessage = (userId, msgId) => {
  return dispatch => {
    return apiCall('delete', `/api/users/${userId}/messages/${msgId}`)
      .then(() => dispatch(remove(msgId)))
      .catch(err => addError(err.message));
  }
}