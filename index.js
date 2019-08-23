const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes/api');
const blogRoute = require('./routes/blog');
const messageRoute = require('./routes/message');
const loginRoute = require('./routes/login');

var expressJwt = require('express-jwt');

const app = express();

// 连接数据库
mongoose.connect('mongodb://localhost:27017/myBlog');
mongoose.Promise = global.Promise;

// jwt中间件
app.use(
  expressJwt({
    secret: 'secret' //加密密钥，可换
  }).unless({
    path: [
      '/login',
      'login',
      { url: '/blog', methods: ['GET'] },
      { url: /^\/blog\/.*$/, methods: ['GET'] },
      { url: '/message', methods: ['POST'] }
    ]
  })
);

app.use(express.json());

app.use(routes);
app.use(loginRoute);
app.use(blogRoute);
app.use(messageRoute);

console.log(routes.stack);

app.listen(8080, () => {
  console.log('服务已启动');
});
