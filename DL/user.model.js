import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensures no two users have the same username
  },
  password: {
    type: String,
    required: true,
    select : false
  },
  instrument: {
    type: String,
    required: true,
  },
  permission: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user', 
  },
});

 const user = mongoose.model('user', userSchema);

 export default user;
