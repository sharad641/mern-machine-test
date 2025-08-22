import express from 'express';
import User from '../models/User.js';
import { agentSchema } from '../utils/validators.js';
import { protect, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Create agent
router.post('/', protect, requireRole('admin'), async (req, res) => {
  const { error, value } = agentSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const exists = await User.findOne({ email: value.email });
  if (exists) return res.status(400).json({ message: 'Email already in use' });

  const agent = await User.create({ ...value, role: 'agent' });
  res.status(201).json({ id: agent._id, name: agent.name, email: agent.email, phone: agent.phone });
});

// List agents
router.get('/', protect, requireRole('admin'), async (req, res) => {
  const agents = await User.find({ role: 'agent' }).select('-password').sort({ createdAt: 1 });
  res.json(agents);
});

export default router;
