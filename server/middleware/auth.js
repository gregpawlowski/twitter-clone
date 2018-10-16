require('dotenv').load();
const jwt = require('jsonwebtoken');

// Make sure user the user is logged in - Athentication
exports.loginRequired = (req, res, next) => {
  // The header will come in as a string with 'Bearer tokenfjklasjfklhio52879y.'. We must split the authroization header on the space and grab the token.
  try {
    // Because the reader might come in undefined, we hav e to use a try / catch.
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded) {
        return next();
      } else {
        return next({
          status: 401,
          message: 'Please log in first'
        });
      }
    });
  } catch(e) {
    next({
      status: 401,
      message: 'Please log in first'
    });
  }

}

// Make sure we ge the correct user - Authorization
exports.ensureCorrectUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({
          status: 401,
          message: 'Unauthorized'
        });
      }
    });
  } catch(e) {
    return next({
      status: 401,
      message: 'Unauthorized'
    });
  }
}