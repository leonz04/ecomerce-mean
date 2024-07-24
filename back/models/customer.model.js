'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CustomerSchema= Schema({
        name:{
            type: String,
            required:true,
        },

        lastName:{
            type: String,
            required:true,
        },

        country:{
            type: String,
            required:false,
        },
        email:{
            type: String,
            required:true,
        },
        password:{
            type: String,
            required:true,
        },

        profile:{
            type: String,
            required:false,
        },

        phone:{
            type: String,
            required:false,
        },

        genre:{
            type: String,
            required:false,
        },
        birthDate:{
            type: String,
            required:false,
        },
        dni: {
            type: String,
            required:false,
        },
        createdAt:{
            type:Date,
            default: Date.now, 
            require:true
        }

});

module. exports=mongoose.model('customer',CustomerSchema);