import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TinymceComponent } from 'ngx-tinymce';
import { ProductService } from '../../../services/product.service';
import { AdminService } from '../../../services/admin.service';


declare let iziToast:any;
declare let jQuery:any;
declare let $:any;


@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    SidebarComponent,
    CommonModule,
    FormsModule,
    HttpClientModule,
      TinymceComponent,

  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {

  public product :any={
    category:''
  };
  public file: any = undefined;
  public imgSelect:any|ArrayBuffer='assets/img/01.jpg';
  public config:any={};
  public token:any;
  public load_btn =false;


  constructor (
    private _productService: ProductService,
    private _adminService: AdminService,
    private _router:Router
  ){
    this.config={
      height:500
    }
    this.token = this._adminService.getToken();
  }

  createProduct(registerProductForm:any){
    if(registerProductForm.valid){
      if(this.file==undefined){
        iziToast.show({
          title: 'ERROR',
          class: 'text-danger',
          position: 'topRight',
          message: 'debe subir portada al crear producto',
          theme: 'dark'
        });

      }else{
        console.log(this.product)
      console.log(this.file)
      this.load_btn=true
      this._productService.register_product_admin(this.product,this.file,this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor:'#1dc740',
            class: 'text-success',
            position: 'topRight',
            message: 'Se registro el nuevo Producto',
            theme: 'dark'
          });
          this.load_btn=false;


          this._router.navigate(['/panel/products'])

        },
        error=>{
          console.log(error)
          this.load_btn=false;

        }
      );
      }


    }else{
      iziToast.show({
        title: 'ERROR',
        class: 'text-danger',
        position: 'topRight',
        message: 'error al crear producto',
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
  }

}
