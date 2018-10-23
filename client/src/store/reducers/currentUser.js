import  { SET_CURRENT_USER } from '../actionTypes';

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {} // All user information when logged in.
};

export default (state = DEFAULT_STATE, action) => {
  switch(action.type) {
    case SET_CURRENT_USER:
      return { 
        ...state,
        // Turn empty object into a false or true if there are keys.
        // !! is the same as using a Boolean().
        isAuthenticated: !!Object.keys(action.user).length,
        user:action.user
      };
    default:
      return state;
  }
}

