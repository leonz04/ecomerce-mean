'use strict'

let express =require('express');
let app = express();
let bodyparser=require('body-parser');
let mongoose=require('mongoose');
let port = process.env.PORT || 4201;

let client_route=require('./routes/customer.routes')
let admin_route=require ('./routes/admin.routes')
let product_route=require ('./routes/product.routes')





// Conexión a la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce')
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
  });
  
  app.use(bodyparser.urlencoded({extended:true}))
  app.use(bodyparser.json({limit:'50mb',extended:true}))

  app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});



app.use('/api',client_route)
app.use('/api',admin_route)
app.use('/api',product_route)



app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });

module.exports=app