let Customer = require('../models/customer.model');
let bcrypt =require('bcrypt')
let jwt = require('../helpers/jwt')

const register_customer= async function(req,res){
    //
    const data=req.body;

    //verificacion correo
    let customers_arr=[];
    customers_arr= await Customer.find({email:data.email});

    if(customers_arr.length==0){
        //Registro
        console.log(data)
        if(data.password){
            
            const hashedPassword = await bcrypt.hash(data.password, 10); 

            if(hashedPassword){
                data.password=hashedPassword;
                const reg = await Customer.create(data)  
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

const login_customer= async function(req,res){
    let data =req.body
    let customer_arr=[];

    customer_arr = await Customer.find({email:data.email});

    if(customer_arr.length==0){
        res.status(200).send({message:"Not found email",data:undefined})
    }else{
        //LOGIN
        let user= customer_arr[0];

        const isValid = await bcrypt.compare(data.password, user.password);
        if (isValid){
            res.status(200).send({
                data:user,
                token: jwt.createToken(user)

            })
            
        } else{
            res.status(200).send({message:"Password not match"})
        }
}
    
}

const get_customers_filter_admin = async function(req,res){
    //console.log(req.user)

    if(req.user){
        if (req.user.role=="admin") {

            let type=req.params['type'];
            let filter=req.params['filter'];

            //console.log(type)

            try {
                if (type == null || type == "null") {
                    let reg = await Customer.find();
                    return res.status(200).send({ data: reg });
                } else {
                    // filtro
                    if (type == "lastName") {
                        let reg = await Customer.find({ lastName: new RegExp(filter, 'i') });
                        return res.status(200).send({ data: reg });
                    } else if (type == "email") {
                        let reg = await Customer.find({ email: new RegExp(filter, 'i') });
                        return res.status(200).send({ data: reg });
                    } else {
                        return res.status(400).send({ message: "Tipo de filtro no válido" });
                    }
                }
            } catch (error) {
                console.error(error);
                return res.status(500).send({ message: "Error del servidor", error: error.message });
            }
            
        }else{
            res.status(500).send({message:"no acces"})

        }
    }else{
        res.status(500).send({message:"no acces"})

    } 


}

const register_customer_admin= async function(req,res){

    let data=req.body;
    if(req.user){
        if(req.user.role=='admin'){

            const hashedPassword = await bcrypt.hash('123456', 10); 
            if(hashedPassword){
                data.password=hashedPassword;
                let reg = await Customer.create(data);
                res.status(200).send({data:reg});

            }else{
                res.status(500).send({message:'hubo un error en el servidor',data:undefined})
            }
        }else{
            res.status(500).send({message:"no acces"})
        }
    }else{
        res.status(500).send({message:"no acces"})

    }

        
    }

const get_customer_admin =async function(req,res){

    console.log("hola desde get_customer_admin")
 
    if(req.user){
        if(req.user.role=='admin'){

            let id=req.params['id'];
            console.log(id)
            try{
                var reg=await Customer.findById({_id:id});
                res.status(200).send({data:reg})

            }catch{
                res.status(200).send({data:undefined})

            }


            
        }else{
            res.status(500).send({message:"no acces"})

        }
    }else{
        res.status(500).send({message:"no acces"})

    }


}

const update_customer_admin= async function(req,res){
    console.log("gello update")
    if(req.user){
        if(req.user.role=="admin"){

            let id=req.params['id'];
            data=req.body;
            reg = await Customer.findByIdAndUpdate({_id:id},{
                name:data.name,
                lastName:data.lastName,
                email:data.email,
                phone:data.phone,  
                birthDate:data.birthDate,
                genre:data.genre,
                dni:data.dni


            })
            res.status(200).send({data:reg})

        }else{
            res.status(500).send({message:"NoAcces"})
        }
    }else{
        res.status(500).send({message:"NoAcces"})
    }
}

const delete_customer_admin = async function(req,res){
    if(req.user){
        if(req.user.role=="admin"){

            let id=req.params['id']

            let reg= await Customer.findByIdAndDelete({_id:id});
            res.status(200).send({data:reg})

        }else{
            res.status(500).send({message:"NoAcces"})
        }
    }else{
        res.status(500).send({message:"NoAcces"})
    }
    
}



module.exports={
    register_customer,
    login_customer,
    get_customers_filter_admin,
    register_customer_admin,
    get_customer_admin,
    update_customer_admin,
    delete_customer_admin
}