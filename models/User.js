const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  userName: { type: String , index: true },
  firstName: String,
  lastName: String,
  encodedPassword: String,
  isAdmin: { type: Boolean, default: false},
})

module.exports = mongoose.model('User', userSchema)

