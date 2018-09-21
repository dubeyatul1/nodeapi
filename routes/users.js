var express = require('express');
var router = express.Router();
const Users = require('../model/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  Users.find({})
    .then((user) =>{
      res.statusCode = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(user);
    },(err) => next(err))
    .catch((err) => next(err));  
})
.post('/add', (req, res, next) =>{
  Users.create(req.body)
    .then((user) =>{
      res.statusCode = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(user);
    },(err) => next(err))
    .catch((err) => next(err));
});

router.get('/user/:userId', (req, res, next) => {
  Users.findById(req.params.userId)
    .then((user) =>{
      res.statusCode = 200;
      res.setHeader('Content-type', 'application/json');
      res.json(user);
    },(err) => next(err))
    .catch((err) => next(err));  
})
.put('/user/:userId', (req, res, next) => {
  Users.findByIdAndUpdate(req.params.userId, {
      $set: req.body
  }, { new: true })
  .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.delete('/user/:userId',(req, res, next) =>{
  Users.findByIdAndRemove(req.params.userId)
    .then((resp) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = router;
