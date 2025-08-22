import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import User from '../models/User.js';
import Contact from '../models/Contact.js';
import { protect, requireRole } from '../middleware/auth.js';
import { parseUploadFile } from '../utils/fileParser.js';
import { distributeRoundRobin } from '../utils/distribute.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dest = path.join(process.cwd(), 'uploads');
    fs.mkdirSync(dest, { recursive: true });
    cb(null, dest);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random()*1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowed = ['.csv', '.xlsx', '.xls', '.axls']; // includes 'axls' per spec
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowed.includes(ext)) cb(null, true);
  else cb(new Error('Only csv, xlsx, xls, axls allowed'));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB

router.post('/', protect, requireRole('admin'), upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'File is required (csv, xlsx, xls, axls)' });
  const filePath = req.file.path;

  try {
    const agents = await User.find({ role: 'agent' }).sort({ createdAt: 1 });
    if (agents.length < 5) {
      return res.status(400).json({ message: 'At least 5 agents are required before uploading' });
    }
    const top5 = agents.slice(0,5);

    const rows = parseUploadFile(filePath);
    const batchId = 'batch_' + Date.now();

    const distributed = distributeRoundRobin(rows, top5).map(r => ({
      firstName: r.firstName,
      phone: r.phone,
      notes: r.notes || '',
      assignedTo: r.assignedTo,
      batchId
    }));

    await Contact.insertMany(distributed);

    // Build per-agent counts
    const counts = {};
    for (const a of top5) counts[a._id] = { agentId: a._id, name: a.name, email: a.email, count: 0 };
    for (const d of distributed) counts[d.assignedTo].count += 1;

    res.json({
      message: 'Upload processed & distributed',
      batchId,
      total: distributed.length,
      distribution: Object.values(counts)
    });
  } catch (err) {
    res.status(400).json({ message: err.message || 'Failed to process file' });
  } finally {
    // Cleanup uploaded file
    fs.unlink(filePath, () => {});
  }
});

export default router;
