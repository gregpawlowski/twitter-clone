const mongoose = require('mongoose');
const User = require('./User');

const messageSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    maxlength: 160
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},{
  // Create a createdAt and updatedAt for each message.
  timestamps: true
});

messageSchema.pre('remove', async function(next) {
  try {
    // Find user
    const user = await User.findById(this.user);
    // Remove this id from the users messsages Array.
    user.messages.remove(this.id);
    // Remove the message id from the user messages array.
    await user.save();
    // Retrun next so that the message is removed.
    return next();
  } catch(e) {
    return next(e);
  }
})

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;