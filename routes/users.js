var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
.post('/signup', (req, res, next) =>{
  bcrypt.hash(req.body.password, 10, function(err, hash){
    if(err) {
      return res.status(500).json({
         error: err
      });
   } else {
     req.body.password = hash,
     Users.create(req.body)
       .then((user) =>{
         res.statusCode = 200;
         res.setHeader('Content-type', 'application/json');
         res.json(user);         
       },(err) => next(err))
       .catch((err) => next(err));
     }
  })
})
.post('/login', function(req, res){
  Users.findOne({email: req.body.email})
  .exec()
  .then(function(user) {
     bcrypt.compare(req.body.password, user.password, function(err, result){
        if(err) {
           return res.status(401).json({
              failed: 'Unauthorized Access'
           });
        }
        if(result) {
           const JWTToken = jwt.sign({
              email: user.email,
              _id: user._id
           },
           'secret',
              {
                 expiresIn: '2h'
              });
           return res.status(200).json({
              success: 'Welcome to the JWT Auth',
              token: JWTToken
           });
        }
        return res.status(401).json({
           failed: 'Unauthorized Access'
        });
     });
  })
  .catch(error => {
     res.status(500).json({
        error: error
     });
  });;
});;

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
