// backend/routes/authRoutes.js
import express from 'express'
import { signin, signout } from '../controllers/authcontroller.js'

const router = express.Router()

router.post('/auth/signin', signin)
router.get('/auth/signout', signout)

export default router
