//produt.route.js
'use strict'


let express = require('express');
let productController=require('../controllers/product.controllers')

let api= express.Router();

let auth = require('../middlewares/authenticate')

let multiparty = require('connect-multiparty')

let path=multiparty({uploadDir:'./uploads/products'})

api.post('/register_product_admin',[auth.auth,path],productController.register_product_admin);
api.get('/get_products_filter_admin/:filter?',auth.auth,productController.get_products_filter_admin);
api.get('/get_frontImage/:img',productController.get_frontImage);
api.get('/get_product_admin/:id',auth.auth,productController.get_product_admin);
api.put('/update_product_admin/:id',[auth.auth,path],productController.update_product_admin);
api.delete('/delete_product_admin/:id',auth.auth,productController.delete_product_admin);






module.exports =api;