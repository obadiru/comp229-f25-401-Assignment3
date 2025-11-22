// backend/controllers/userController.js
import User from '../models/user.js'

// GET /api/users  (protected)
export const getAll = async (_req, res) => {
  try {
    const users = await User.find({}, '_id name email created updated')
    res.json(users)
  } catch (err) {
    console.error('getAll error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// GET /api/users/:id  (protected)
export const getById = async (req, res) => {
  try {
    const { id } = req.params        
    const user = await User.findById(id, '_id name email created updated')

    if (!user) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.json(user)
  } catch (err) {
    console.error('getById error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// POST /api/users  (register)
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    const existing = await User.findOne({ email })
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' })
    }

    const user = new User({
      name,
      email,
      password,
      created: new Date()
    })

    await user.save()

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      created: user.created,
      updated: user.updated
    })
  } catch (err) {
    console.error('register error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// PUT /api/users/:id  (protected)
export const updateById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json({ message: 'Not found' })
    }

    if (req.body.name !== undefined) user.name = req.body.name
    if (req.body.email !== undefined) user.email = req.body.email
    if (req.body.password !== undefined) user.password = req.body.password
    user.updated = new Date()

    await user.save()

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      created: user.created,
      updated: user.updated
    })
  } catch (err) {
    console.error('updateById error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// DELETE /api/users/:id  (protected)
export const removeById = async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndDelete(id)

    if (!user) {
      return res.status(404).json({ message: 'Not found' })
    }

    res.json({ message: 'Deleted' })
  } catch (err) {
    console.error('removeById error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}

// DELETE /api/users  (protected)
export const removeAll = async (_req, res) => {
  try {
    await User.deleteMany({})
    res.json({ message: 'All deleted' })
  } catch (err) {
    console.error('removeAll error:', err)
    res.status(500).json({ message: 'Server error' })
  }
}
