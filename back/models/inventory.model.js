'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let InventorySchema= Schema({
        producto:{
            type: Schema.ObjectId,ref:'product',required:true},
        quantity:{
            type:Number,required:true},
        admin:{
            type: Schema.ObjectId,ref:'admin',required:true},
        supplier:{
            type:String,required:true},       
        createdAt:{
            type:Date,
            default: Date.now, 
            required:true
        }

});

module. exports=mongoose.model('inventory',InventorySchema);