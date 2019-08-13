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
  const mdReg = /#+|`+|\*+/g;
  Blog.find({}).then(blogs => {
    const blogList = blogs.map(blog => {
      let des = blog.content.replace(mdReg, '').slice(0, 200) + '...';
      return {
        title: blog.title,
        body: des,
        id: blog._id
      };
    });
    console.log(blogList);
    res.send(blogList);
  });
});

// 获取文章详情
router.get('/blog/:id', (req, res) => {
  Blog.findById(req.params.id).then(blog => {
    res.send({
      title: blog.title,
      content: blog.content
    });
  });
});

// 添加文章
router.post('/blog', (req, res) => {
  Blog.create(req.body)
    .then(blog => {
      console.log(blog);
      res.send(blog);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

// 删除文章
router.delete('/blog/:id', (req, res) => {
  Blog.findOneAndDelete({ _id: req.params.id }).then(blog => {
    console.log(blog);
    res.send(blog);
  });
});

// 编辑文章
router.put('/blog/:id', (req, res) => {
  Blog.findByIdAndUpdate(req.params.id, req.body)
    .then(blog => {
      res.sendStatus(200);
    })
    .catch();
});

module.exports = router;
