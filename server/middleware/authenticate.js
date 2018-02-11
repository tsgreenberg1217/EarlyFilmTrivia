const keys = require('../config/keys')
const mongoose = require('mongoose')
// mongoose.connect(keys.mongoURI)
require('../models/User')
const User = mongoose.model('users')



const authenticate = (req,res,next)  =>{
  // route wont run until next is called in middleware
  let token = req.header('x-auth')
  const user = User.findByToken(token)
  .then(user =>{
    if(!user){
      return Promise.reject()
    }
    req.user = user
    req.token = token
    next()
  }).catch((err)=>{
    res.status(401).send()
  })
}

module.exports = {authenticate}
