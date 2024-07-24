'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProductSchema= Schema({
        title:{
            type: String,
            required:true,
        },
        slug:{
            type: String,
            required:true,
        },
        galery:[{
            type:Object,
            require:false,
        }],
        frontImage:{
            type: String,
            required:true,
        },
        price:{
            type: Number,
            required:true,
        },
        description:{
            type: String,
            required:true,
        },
        content:{
            type: String,
            required:true,
        },
        stock:{
            type: Number,
            required:true,
        },
        sales:{
            type: Number,
            default:0,
            required:true,
        },
        score:{
            type: Number,
            default:0,
            required:true,
        },
        category:{
            type: String,
            required:true,
        },
        state:{
            type:String,
            default:'Edit',
            require:true,

        },        

        createdAt:{
            type:Date,
            default: Date.now, 
            require:true
        }

});

module. exports=mongoose.model('product',ProductSchema);