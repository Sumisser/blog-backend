const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  title: {
    type: String,
    required: [true, '标题不能为空']
  },
  content: {
    type: String,
    required: [true, '内容不能为空']
  },
  time: String
});

const Blog = mongoose.model('myBlog', BlogSchema);
module.exports = Blog;

