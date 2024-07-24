'use strict'

let express = require('express');
let adminController=require('../controllers/admin.controllers')

let api= express.Router();

api.post('/register_admin',adminController.register_admin)

api.post('/login_admin',adminController.login_admin)


module.exports =api;