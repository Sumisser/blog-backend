const express = require('express');
const router = express.Router();
var jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const password = req.body.password;
  console.log(password);
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

module.exports = router;
