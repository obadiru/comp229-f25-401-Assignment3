import express from 'express';
import * as ctrl from '../controllers/contactController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// toggle protection by resource if needed
const protect = (req, res, next) => next(); // no-op default

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.createOne);
router.put('/:id', ctrl.updateById);
router.delete('/:id', ctrl.removeById);
router.delete('/', ctrl.removeAll);

export default router;
