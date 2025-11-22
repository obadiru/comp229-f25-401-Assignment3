// backend/routes/userRoutes.js
import express from 'express'
import {
  getAll, getById, register, updateById, removeById, removeAll
} from '../controllers/userController.js'
import { requireSignin, hasAuthorization } from '../controllers/authcontroller.js'

const router = express.Router()

// Slide-preferred register route
router.post('/', register)

// Protected routes
router.get('/', requireSignin, getAll)
router.get('/:id', requireSignin, getById)
router.put('/:id', requireSignin, hasAuthorization, updateById)
router.delete('/:id', requireSignin, hasAuthorization, removeById)

// Optional admin cleanup (protected)
router.delete('/', requireSignin, removeAll)

export default router
