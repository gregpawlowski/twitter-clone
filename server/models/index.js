const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost:27017/warbler', {useNewUrlParser: true})
.then(() => console.log('Connected to mongodb!'));

module.exports.User = require('./User');
module.exports.Message = require('./Message');