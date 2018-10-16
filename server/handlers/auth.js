const db = require('../models'),
jwt = require('jsonwebtoken');

exports.signin = async (req, res, next) => {
  try{
    // Fina a user
    const user = await db.User.findOne({
      email: req.body.email
    });
    const {id, username, profileImageUrl} = user;
    // Check if passwrod matches
    const isMatch = await  user.comparePassword(req.body.password);
    // Log them in by sending a jwt if match
    if (isMatch) {
      // Crete token using sign and pass in payload.
      const token = jwt.sign({
        id,
        username,
        profileImageUrl
      }, process.env.SECRET_KEY);
      return res.status(200).json({
        id,
        username,
        profileImageUrl,
        token
      });
    }
  
    return next({
      status: 400,
      message: 'Invalid Email/Password'
    })
  } catch(e) {
    return next({
      status: 400,
      message: 'Invalid Email/Password'
    })
  }
}

exports.signup = async (req, res, next) => {
  try {
    // Create a user
    const user = await db.User.create(req.body);
    const {id, username, porifleImageUrl } = user;
    // Create a token
    const token = jwt.sign({
      id,
      username,
      porifleImageUrl
    }, process.env.SECRET_KEY);
    return res.status(200).json({
      id,
      username,
      porifleImageUrl,
      token
    });
  } catch(err) {
    // See what kind of error, if certain error respone with user/email taken
    // 11000 is mongoose validation failed error
    if (err.code === 11000) {
      err.message = 'Sorry that username and/or email is taken';
    }
    // Otherwise just send back a generic 400 error.
    return next({
      status: 400,
      message: err.message
    });

  }
}

