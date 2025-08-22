import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { loginSchema } from '../utils/validators.js';

const router = express.Router();

const signToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Seed an admin (idempotent)
router.post('/seed-admin', async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) return res.status(400).json({ message: 'name, email, password required' });
  const existing = await User.findOne({ email });
  if (existing) return res.json({ message: 'Admin already exists', email });
  const admin = await User.create({ name, email, password, role: 'admin' });
  res.status(201).json({ message: 'Admin created', id: admin._id, email: admin.email });
});

router.post('/login', async (req, res) => {
  const { error, value } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { email, password } = value;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await user.comparePassword(password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = signToken(user);
  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email, role: user.role }
  });
});

export default router;
