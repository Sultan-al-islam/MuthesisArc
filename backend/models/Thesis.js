import mongoose from 'mongoose';

const thesisSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
  },
  abstract: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  driveLink: {
    type: String,
    required: true,
  },
  colabLink: {
    type: String,
    required: false,
  },
  uploader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Thesis = mongoose.model('Thesis', thesisSchema);

export default Thesis;
