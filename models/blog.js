const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogSchema = new Schema({
  html: {
    type: String,
    required: [true, '内容不能为空']
  }
});

const Blog = mongoose.model('myBlog', BlogSchema);
module.exports = Blog;
