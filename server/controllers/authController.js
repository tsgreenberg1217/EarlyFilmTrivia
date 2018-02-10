const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({extended: false}))
router.use(bodyParser.json())
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
