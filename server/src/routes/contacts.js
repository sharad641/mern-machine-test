import express from 'express';
import Contact from '../models/Contact.js';
import { protect, requireRole } from '../middleware/auth.js';

const router = express.Router();

// Admin: list contacts (optionally by agentId and/or batchId)
router.get('/', protect, requireRole('admin'), async (req, res) => {
  const { agentId, batchId } = req.query;
  const filter = {};
  if (agentId) filter.assignedTo = agentId;
  if (batchId) filter.batchId = batchId;

  const contacts = await Contact.find(filter)
    .populate('assignedTo', 'name email')
    .sort({ createdAt: -1 });
  res.json(contacts);
});

// Agent: get own contacts
router.get('/mine', protect, async (req, res) => {
  if (req.user.role !== 'agent') return res.status(403).json({ message: 'Forbidden' });
  const contacts = await Contact.find({ assignedTo: req.user._id })
    .sort({ createdAt: -1 });
  res.json(contacts);
});

export default router;
