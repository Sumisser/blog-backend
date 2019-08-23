const express = require('express');
const router = express.Router();
const Message = require('../models/message');

router.post('/message', (req, res) => {
  const body = { ...req.body, time: Date.now() };
  Message.create(body)
    .then(message => {
      res.send(message);
    })
    .catch(err => {
      res.sendStatus(500);
    });
});

router.get('/message', (req, res) => {
  Message.find({}).then(messages => {
    const sortMessages = messages.sort((a, b) => {
      return Number(b.time) - Number(a.time);
    });
    res.send(sortMessages);
  });
});

module.exports = router;
