'use strict'

let jwt = require('jwt-simple')
let moment = require('moment')
let secret='leon'

exports.auth=function(req,res,next){

    if(!req.headers.authorization){
        return res.status(403).send({message:"no cabecera de auth"})
    }

    let token=req.headers.authorization.replace(/['"]+/g,'');

    var segment = token.split('.')
    let payload= jwt.decode(token,secret)




    if (segment.length!=3) {
        return res.status(403).send({message:"invalidToken"})
        
    }else{
        try {
            
            if (payload.exp<= moment().unix()) {
                return res.status(403).send({message:"expiredToken"})                 
            }
            
        } catch (error) {
            return res.status(403).send({message:"invalidToken"})            
        }
    }

    req.user=payload;

    next();
}