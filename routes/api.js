const express = require('express');
const router = express.Router();
const Blog = require('../models/blog');

router.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
  );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// 登录
router.post('/login', (req, res) => {
  Blog.create(req.body)
    .then(blog => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

// 获取文章列表
router.get('/blog', (req, res) => {
  Blog.find({}).then(blogs => {
    // console.log(blogs);
    const titleReg = /<h[1-6]>\S+?<\/h[1-6]>/g;
    blogs.map(blog => {
      let title = '未命名';
      if (blog.html.match(titleReg)) {
        title = blog.html.match(titleReg)[0];
      }
    });
    res.send(blog);
  });
});

// 获取文章详情
router.get('/blog/:id', (req, res) => {
  res.send({
    title: 'title',
    body: 'sdnsidlgnsdglsndglgiilisnlgni'
  });
});

// 添加文章
router.post('/blog', (req, res) => {
  // Blog.create(req.body)
  //   .then(blog => {
  //     res.send(blog);
  //   })
  //   .catch(err => {
  //     res.sendStatus(500);
  //   });
  res.send(req.body);
});

// 删除文章
router.delete('/blog/:id', (req, res) => {
  res.send('删除成功');
});

// 编辑文章
router.put('/blog/:id', (req, res) => {
  res.send('更新成功' + req);
});

module.exports = router;
