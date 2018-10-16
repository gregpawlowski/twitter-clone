const db = require('../models');

exports.createMessage = async (req, res, next) => {
  try {
    const message = await db.Message.create({
      text: req.body.text,
      user: req.params.id
    });

    const foundUser = await db.User.findById(req.params.id);
    foundUser.messages.push(message._id);
    await foundUser.save();
    const foundMessage = await db.Message.findById(message._id).populate('user', {
      username: true,
      profileImageUrl: true
    });
    res.status(200).json(foundMessage);
  } catch(e) {
    next(e);
  }
}


exports.getMessage = async (req, res, next) => {
  try {
    const message = await db.Message.findById(req.params.message_id);
    return res.status(200).json(message);
  } catch(e) {
    return next(e);
  }
}

exports.deleteMessage = async (req, res, next) => {
  try {
    const foundMessage = await db.Message.findById(req.params.message_id);
    await foundMessage.remove();
    return res.status(200).json(foundMessage);
  } catch(e) {
    return next(e);
  }
}