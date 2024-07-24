//product.controllers.js
'use strict'

let Product = require('../models/product.model')

let fs=require('fs')
let path=require('path')

const register_product_admin = async function(req,res){

    if(req.user){
        if(req.user.role){
            let data=req.body;

            let img_path= req.files.frontImage.path;
            console.log("hola"+img_path)
            let aux_img_name= img_path?.split('\\');
            let frontImage_name=aux_img_name[2]

            data.slug=data.title.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
            data.frontImage=frontImage_name
            let reg=await Product.create(data);

            res.status(200).send({data:reg});
        }else{
            res.status(500).send({message:"no acces"})
        }
    }else{
        res.status(500).send({message:"no acces"})
    }

}

const get_products_filter_admin=async function(req,res){
    if(req.user){
        if(req.user.role){
           let filter = req.params['filter']

           let reg= await Product.find({title: new RegExp(filter,'i')});
           res.status(200).send({data:reg});
        }else{
            res.status(500).send({message:"no acces"})
        }
    }else{
        res.status(500).send({message:"no acces"})
    }
}

const get_frontImage=async function(req,res){
    let img=req.params['img'];

    console.log(img)
    fs.stat('./uploads/products/'+img,function(err){
        if(!err){
            let path_img='./uploads/products/'+img;
            res.status(200).sendFile(path.resolve(path_img));
        }else{
            let path_img='./uploads/default.jpg';
            res.status(200).sendFile(path.resolve(path_img));
        }
    })

}

const get_product_admin =async function(req,res){   

    console.log("hola desde get_product_admin")
 
    if(req.user){
        if(req.user.role=='admin'){

            let id=req.params['id'];
            console.log(id)
            try{
                var reg=await Product.findById({_id:id});
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

const update_product_admin = async function(req,res){

    if(req.user){
        let id=req.params['id']
        let data=req.body;

        if(req.user.role=="admin"){
            console.log("id")
            console.log(id)
            console.log("first")
            console.log(req.files);
             if (req.files && req.files.frontImage) {
                // si imagen
                let img_path= req.files.frontImage.path;
                console.log("hola si imagen+img_path");
                let aux_img_name= img_path?.split('\\');
                let frontImage_name=aux_img_name[2];

                let reg = await Product.findByIdAndUpdate({_id:id},{
                    title:data.title,
                    stock:data.stock,
                    price:data.price,
                    category:data.category,
                    description:data.description,
                    content:data.content,
                    frontImage:frontImage_name
                });

                fs.stat('./uploads/products/'+reg.frontImage,function(err){
                    if(!err){
                        fs.unlink('./uploads/products/'+reg.frontImage,(err)=>{
                            if(err) throw err;
                        });
                    }
                })


                res.status(200).send({datperroa:reg})

            }else{
                //no imagen
                console.log("data nnoimage")
                console.log(id)
                let reg = await Product.findByIdAndUpdate({_id:id},{
                    title:data.title,
                    stock:data.stock,
                    price:data.price,
                    category:data.category,
                    description:data.description,
                    content:data.content,
                });
                res.status(200).send({datperroa:reg})

            }

            
            // res.status(200).send({data:reg});
        }else{
            res.status(500).send({message:"no acces"})
        }
    }else{
        res.status(500).send({message:"no acces"})
    }

}

const delete_product_admin = async function(req,res){
    if(req.user){
        if(req.user.role=="admin"){

            let id=req.params['id']

            let reg= await Product.findByIdAndDelete({_id:id});
            res.status(200).send({data:reg})

        }else{
            res.status(500).send({message:"NoAcces"})
        }
    }else{
        res.status(500).send({message:"NoAcces"})
    }
    
}

// const update_product_admin = async function(req, res) {
//     if (req.user && req.user.role === "admin") {
//         let id = req.params['id'];
//         let data = req.body;

//         if (req.files && req.files.frontImage) {
//             // Si hay una nueva imagen
//             let img_path = req.files.frontImage.path;
//             let aux_img_name = img_path?.split('\\');
//             let frontImage_name = aux_img_name[2];

//             // Actualizar también la imagen
//             data.frontImage = frontImage_name;
//         }

//         try {
//             // Actualizar el producto en la base de datos
//             let reg = await Product.findByIdAndUpdate(id, {
//                 title: data.title,
//                 stock: data.stock,
//                 price: data.price,
//                 category: data.category, // Corregido el nombre del campo 'cotegory' a 'category'
//                 description: data.description,
//                 content: data.content,
//                 frontImage: data.frontImage // Esto solo se actualizará si se proporciona una nueva imagen
//             }, { new: true }); // Para devolver el documento actualizado

//             res.status(200).send({ data: reg });
//         } catch (error) {
//             res.status(500).send({ message: 'Error al actualizar el producto', error });
//         }
//     } else {
//         res.status(500).send({ message: 'Acceso no autorizado' });
//     }
// }

// const update_product_admin = async function(req, res) {
//     try {
//         if (!req.user || req.user.role !== "admin") {
//             return res.status(401).send({ message: 'Acceso no autorizado' });
//         }

//         let id = req.params.id;
//         let data = req.body;

//         // Verificar si se subió una nueva imagen
//         if (req.files && req.files.frontImage) {
//             let img_path = req.files.frontImage.path;
//             let aux_img_name = img_path.split('\\').pop(); // Tomar solo el nombre del archivo
//             data.frontImage = aux_img_name;
//         }

//         // Actualizar el producto en la base de datos
//         let updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

//         if (updatedProduct) {
//             res.status(200).send({ data: updatedProduct });
//         } else {
//             res.status(404).send({ message: 'Producto no encontrado' });
//         }
//     } catch (error) {
//         console.error("Error en update_product_admin:", error);
//         res.status(500).send({ message: 'Error al actualizar el producto', error });
//     }
// }







module.exports={
    register_product_admin,
    get_products_filter_admin,
    get_frontImage,
    get_product_admin,
    update_product_admin,
    delete_product_admin
}