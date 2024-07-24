let Admin = require ('../models/admin.model')
let bcrypt =require('bcrypt')
let jwt = require('../helpers/jwt')

const register_admin= async function(req,res){
    //
    const data=req.body;

    //verificacion correo
    let customers_arr=[];
    admins_arr= await Admin.find({email:data.email});

    if(admins_arr.length==0){
        //Registro
        //console.log(data)
        if(data.password){
            
            const hashedPassword = await bcrypt.hash(data.password, 10); 

            if(hashedPassword){
                data.password=hashedPassword;
                const reg = await Admin.create(data)  
                res.status(200).send({data:reg});

            }else{
                res.status(200).send({messsage:"error Server",data:undefined});

            }
        }else{
            res.status(200).send({messsage:"need password?",data:undefined});
        }
    }else{
        res.status(200).send({messsage:"Forget password?",data:undefined});
    }
}

const login_admin= async function(req,res){
    let data =req.body
    console.log(req.body)
    let admin_arr=[];

    admin_arr = await Admin.find({email:data.email});
    console.log('afminarr '+ data.email + ' 123' + admin_arr)

    if(admin_arr.length==0){
        res.status(200).send({message:"Not found email",data:undefined})
    }else{
        //LOGIN
        let admin= admin_arr[0];

        const isValid = await bcrypt.compare(data.password, admin.password);
        if (isValid){
            res.status(200).send({
                data:admin,
                token: jwt.createToken(admin)

            })
        } else{
            res.status(200).send({message:"Password not match"})
        }
}
    
}

module.exports={
    register_admin,
    login_admin
}