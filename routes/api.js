const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');

const _ = require('lodash');
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
  const password = req.body.password;
  if (req.body.password !== '我命由我不由天！') {
    return res.status(400).send('暗号错误，成功登出');
  }
  // 加密，获取token
  let token = jwt.sign(
    {
      password
    },
    'secret',
    {
      expiresIn: 60 * 60 * 24 // 授权时效24小时
    }
  );
  res.status(200).json(token);
});

// 获取文章列表
router.get('/blog', (req, res) => {
  const mdReg = /#+|`+|\*+/g;
  Blog.find({})
    .then(blogs => {
      // 总页数
      let pages = Math.ceil(blogs.length / 3);

      // 当前索引
      let index = Number(req.query.index) || 1;
      if (index > pages) {
        index = pages;
      } else if (index < 1) {
        index = 1;
      }
      const blogList = blogs
        .map(blog => {
          let des = blog.content.replace(mdReg, '').slice(0, 200) + '...';
          return {
            title: blog.title,
            body: des,
            id: blog._id,
            time: blog.time
          };
        })
        .sort((a, b) => {
          return Number(b.time) - Number(a.time);
        });
      const posts = blogList.length ? _.chunk(blogList, 3)[index - 1] : [];
      res.send({
        pages,
        index,
        posts
      });
    })
    .catch(err => {
      res.sendStatus(500).send(err);
    });
});

// 获取文章详情
router.get('/blog/:id', (req, res) => {
  Blog.findById(req.params.id)
    .then(blog => {
      res.send({
        title: blog.title,
        content: blog.content
      });
    })
    .catch(err => {
      res.sendStatus(404);
    });
});

// 添加文章
router.post('/blog', (req, res) => {
  const body = { ...req.body, time: Date.now() };
  Blog.create(body)
    .then(blog => {
      res.send(blog);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

// 删除文章
router.delete('/blog/:id', (req, res) => {
  Blog.findOneAndDelete({ _id: req.params.id }).then(blog => {
    res.send(blog);
  });
});

// 编辑文章
router.put('/blog/:id', (req, res) => {
  const body = { ...req.body, time: Date.now() };
  Blog.findByIdAndUpdate(req.params.id, body)
    .then(blog => {
      res.sendStatus(200);
    })
    .catch();
});

module.exports = router;
