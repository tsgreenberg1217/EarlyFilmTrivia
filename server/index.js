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

app.get('/users/me', (req,res)=>{

  let token = req.header('x-auth')
  const user = User.findByToken(token)
  .then(user =>{
    if(!user){
      return Promise.reject()
    }
    res.send(user)
  }).catch((err)=>{
    res.status(401).send()
  })
})

const PORT = process.env.PORT || 5000
app.listen(PORT)
