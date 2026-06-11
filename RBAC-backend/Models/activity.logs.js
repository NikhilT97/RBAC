const mongoose = require('mongoose')

const activityLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  action: {
    type: String,
    enum: ['login', 'task_created', 'task_updated', 'task_deleted']
  },
  details: { type: String }, 
}, { timestamps: true });    

module.exports = mongoose.model('ActivityLog', activityLogSchema);