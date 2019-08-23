const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  name: {
    type: String,
    required: [true, '名字不能为空']
  },
  phone: {
    type: String,
    required: [true, '电话不能为空']
  },
  comments: {
    type: String,
    required: [true, '留言不能为空']
  },
  time: String
});

const Message = mongoose.model('message', MessageSchema);
module.exports = Message;
