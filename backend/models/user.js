import mongoose from 'mongoose'
import crypto from 'crypto'

const UserSchema = new mongoose.Schema({
  name:   { type: String, trim: true, required: 'Name is required' },
  email:  {
    type: String, trim: true, unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  created: { type: Date, default: Date.now },
  updated: { type: Date },
  hashed_password: { type: String, required: 'Password is required' },
  salt: String
})

// Virtual field: password -> sets salt + hashed_password
UserSchema.virtual('password')
  .set(function (password) {
    this._password = password
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hashed_password = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
      .toString('hex')
  })
  .get(function () { return this._password })

// Compare plaintext vs stored hash
UserSchema.methods.authenticate = function (plainText) {
  const hash = crypto.pbkdf2Sync(plainText, this.salt, 1000, 64, 'sha512').toString('hex')
  return this.hashed_password === hash
}

export default mongoose.model('User', UserSchema)
