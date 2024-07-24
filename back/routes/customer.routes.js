'use strict'

let express = require('express');
let customerController=require('../controllers/customer.controllers')

let api= express.Router();

let auth = require('../middlewares/authenticate')

api.post('/register_customer',customerController.register_customer);

api.post('/login_customer',customerController.login_customer);

api.get('/get_customers_filter_admin/:type/:filter?',auth.auth,customerController.get_customers_filter_admin)

api.post('/register_customer_admin',auth.auth,customerController.register_customer_admin);

api.get('/get_customer_admin/:id',auth.auth,customerController.get_customer_admin);

api.put('/update_customer_admin/:id',auth.auth,customerController.update_customer_admin);

api.delete('/delete_customer_admin/:id',auth.auth,customerController.delete_customer_admin);



module.exports =api;