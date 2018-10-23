import axios from 'axios';

export function setTokenHeader(token) {
  if(token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

/**
 * A wrapper arond axios API call that formats errors, etc..
 * @param {string} method The HTTP verb you want to use.
 * @param {string} path The URL / route path endpoint .
 * @param {object} data (optional) data in JSON format for POST requests.
 */
export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](path, data)
      .then(res => {
        return resolve(res.data)
      })
      .catch(err => {
        return reject(err.response.data.error);
      });
  });
}