'use strict'

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AdminSchema= Schema({
        name:{
            type: String,
            required:true,
        },

        lastName:{
            type: String,
            required:true,
        },
        email:{
            type: String,
            required:true,
        },
        password:{
            type: String,
            required:true,
        },
        phone:{
            type: String,
            required:true,
        },
        rol:{
            type: String,
            required:true,
            default:"admin"
        },
        dni: {
            type: String,
            required:true,
        },
        

});

module. exports=mongoose.model('admin',AdminSchema);