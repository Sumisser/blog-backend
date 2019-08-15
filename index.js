const express = require('express');
const routes = require('./routes/api');
const mongoose = require('mongoose');

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
      { url: '/login', methods: ['POST'] },
      { url: '/blog', methods: ['GET'] },
      { url: /^\/blog\/.*$/, methods: ['GET'] },
      '/login',
      
    ] 
  })
);

app.use(express.json());

app.use(routes);

app.listen(8080, () => {
  console.log('服务已启动');
});
