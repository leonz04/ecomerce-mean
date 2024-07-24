import { title } from 'process';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { TinymceComponent } from 'ngx-tinymce';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { response } from 'express';
import { error } from 'console';
import { GLOBAL } from '../../../services/GLOBAL';
import { AdminService } from '../../../services/admin.service';

declare let iziToast:any;
declare let jQuery:any;
declare let $:any;


@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [FormsModule,SidebarComponent,CommonModule,TinymceComponent],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})
export class UpdateProductComponent implements OnInit {

  public product:any ={};
  public load_btn=false;
  public config:any={};
  public imgSelect:String|ArrayBuffer|null='';
  public id:any;
  public token:any;
  public urlImg:any;
  public file:any;




  constructor(
    private _route:ActivatedRoute,
    private _productService:ProductService,
    private _adminService: AdminService,
    private _router:Router
  ){
    this.config={
      height:500
  }
  //this.token = this._adminService.getToken();
  this.token=localStorage.getItem('token')
  this.urlImg=GLOBAL.url;
}

ngOnInit():void{
  this._route.params.subscribe(
    params=>{
      this.id=params["id"];
      console.log(this.id)
      this._productService.get_product_admin(this.id,this.token).subscribe(
        response=>{
          if(response.data==undefined){
            this.product=undefined

          }else{
            this.product=response.data;
            this.imgSelect= this.urlImg + 'get_frontImage/' +this.product.frontImage
          }
          console.log(response)

        },
        error=>{
          console.log(error)
        }
      )

    }
  );

}



  updateProduct(updateProductForm:any){
    console.log('token'+this.token)
    if(updateProductForm.valid){

      let data:any={};

      if(this.file!=undefined){
        data.frontImage=this.file
      }
      data.title=this.product.title
      data.stock=this.product.stock
      data.price=this.product.price
      data.category=this.product.category
      data.description=this.product.description
      data.content=this.product.content
      console.log(data)
      this.load_btn=true


      this._productService.update_product_admin(data,this.id,this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor:'#1dc740',
            class: 'text-success',
            position: 'topRight',
            message: 'Se ACTUALIZactualizo el Producto',
            theme: 'dark'
          });
          this.load_btn=false


          this._router.navigate(['/panel/products']);

        },
        error=>{
          console.log(error)
          this.load_btn=false;


        }
      )


    }else{
      iziToast.show({
        title: 'ERROR',
        class: 'text-danger',
        position: 'topRight',
        message: 'error actualizar formulario no valido',
        theme: 'dark'
      });
      this.load_btn=false;


    }

  }

  fileChangeEvent(event:any){
    let file;
    if(event.target.files && event.target.files[0] ){

      file=<File>event.target.files[0];
      console.log(file)

    }else{
      iziToast.show({
        title: 'ERROR',
        class: 'text-danger',
        position: 'topRight',
        message: 'error Imagen',
        theme: 'dark'
      });
      $('#input-front').text('select image');
        this.imgSelect='assets/img/01.jpg'
        this.file=undefined;

    }

    if(file!.size<=4000000){
      //ASD
      if(file!.type=='image/png'||file!.type=='image/jpg'||file!.type=='image/webp'||file!.type=='image/jpeg'||file!.type=='image/gif'){

        const reader = new FileReader();
        reader.onload = e => this.imgSelect=reader.result;
        console.log(this.imgSelect);
        reader.readAsDataURL(file!);

        $('#input-front').text(file!.name);
        this.file=file;

      }else{
        iziToast.show({
          title: 'ERROR',
          class: 'text-danger',
          position: 'topRight',
          message: 'El archivo debe ser una imagen',
          theme: 'dark'
        });
        $('#input-front').text('select image');
        this.imgSelect='assets/img/01.jpg'
        this.file=undefined;


      }

    }else{
      iziToast.show({
        title: 'ERROR',
        class: 'text-danger',
        position: 'topRight',
        message: 'La imagen no puede superar los 4MB',
        theme: 'dark'
      });
      $('#input-front').text('select image');
        this.imgSelect='assets/img/01.jpg'
        this.file=undefined;

    }
    console.log(this.file);
  }}
