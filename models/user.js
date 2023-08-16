import { Schema, model, models } from 'mongoose';

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: { type: String, select: false },
  loggedIn: Boolean
});

export default models.users || model('users', userSchema);