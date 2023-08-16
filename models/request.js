import { Schema, model, models } from 'mongoose';

const requestSchema = new Schema({
  fullName: String,
  department: String,
  dateRequested: Date,
  issueHeadline: String,
  issueDescription: String,
  status: String,
  technician: String
});

export default models.requests || model('requests', requestSchema);