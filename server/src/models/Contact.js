import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    notes: { type: String, default: '', trim: true },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    batchId: { type: String, required: true }
  },
  { timestamps: true }
);

const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
