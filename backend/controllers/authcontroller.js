import dotenv from 'dotenv'
dotenv.config()

import jwt from 'jsonwebtoken'
import { expressjwt } from 'express-jwt'
import User from '../models/user.js'

// POST /auth/signin
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ error: 'User not found' })
    }

    // sanity check for slide-style schema
    if (!user.salt || !user.hashed_password) {
      console.error('signin error: user is missing salt/hashed_password; re-register this user', {
        _id: user._id, email: user.email
      })
      return res.status(500).json({ error: 'User credentials not initialized. Please register again.' })
    }

    const ok = user.authenticate(password)
    if (!ok) {
      return res.status(401).json({ error: "Email and password don't match" })
    }

    const secret = process.env.JWT_SECRET || 'super_secret_change_me'
    const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '1h' })

    return res.json({ token, user: { _id: user._id, name: user.name, email: user.email } })
  } catch (e) {
    console.error('signin error (exception):', e)
    return res.status(401).json({ error: 'Could not sign in' })
  }
}


// GET /auth/signout
export const signout = (_req, res) => {
  return res.json({ message: 'signed out' })
}

// Read secret at request time to avoid early-init issues
export const requireSignin = (req, res, next) => {
  const secret = process.env.JWT_SECRET || 'super_secret_change_me'
  return expressjwt({
    secret,
    algorithms: ['HS256'],
    requestProperty: 'auth'
  })(req, res, next)
}

// Only owner can modify their own user
export const hasAuthorization = (req, res, next) => {
  const ownerId = req.params.id
  const tokenId = req.auth?.id
  if (String(ownerId) !== String(tokenId)) {
    return res.status(403).json({ error: 'User is not authorized' })
  }
  next()
}
