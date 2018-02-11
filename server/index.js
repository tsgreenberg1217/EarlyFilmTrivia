const keys = require('./config/keys')
const mongoose = require('mongoose')
mongoose.connect(keys.mongoURI)
require('./models/User')
const User = mongoose.model('users')
const express = require('express')
const app = express()
const pry = require('pryjs')
const bodyParser  = require('body-parser');
const morgan = require('morgan');
const jwt = require('jsonwebtoken')
const lodash = require('lodash')
const {authenticate} = require('./middleware/authenticate')


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('secret',keys.secret)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/signin', (req,res) => {
  const body = lodash.pick(req.body, ['username','password'])
  const user = new User({
    username: body.username,
    password: body.password
  })
  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user)
  }).catch((e) => {
    res.status(400).send(e)
  })
})

app.post('users/login', (req,res)=>{
  const body = lodash.pish(req.body, ['username', 'password'])
  const user = User.findOne({username: body.username})
  .then(user =>{
    if(!user){
      res.status(401).send()
    }
    user.comparePassword(body.password,())
    .then(res =>{
      
    })
  })
})


app.get('/users/me', authenticate ,(req,res)=>{
  res.send(req.user)
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
