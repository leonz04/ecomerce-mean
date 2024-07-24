import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { response } from 'express';
import { GLOBAL } from '../../../services/GLOBAL';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

declare let iziToast:any;
declare let jQuery:any;
declare let $:any;

@Component({
  selector: 'app-index-product',
  standalone: true,
  imports: [RouterModule,FormsModule,SidebarComponent,CommonModule,NgbPaginationModule],
  templateUrl: './index-product.component.html',
  styleUrl: './index-product.component.css'
})
export class IndexProductComponent implements OnInit {


  public page=1;
  public pageSize=20;
  public load_data=true;
  public filter='';
  public token;
  public products:Array<any>=[];
  public url:any;

  public load_btn=false;

  constructor(
    private _productService:ProductService
  ){
    this.token=localStorage.getItem('token');
    this.url=GLOBAL.url
  }

  ngOnInit(): void {
    this.init_data();


  }

  init_data(){
    this._productService.get_products_filter_admin(this.filter,this.token).subscribe(
      response=>{
        console.log(response);
        this.products=response.data;
        this.load_data=false;

      },
      error=>{
        console.log(error);
      }
    )
  }

  filtering(){
    if(this.filter){
      this._productService.get_products_filter_admin(this.filter,this.token).subscribe(
        response=>{
          console.log(response)
          this.products=response.data
          this.load_data=false

        },
        error=>{
          console.log(error)
        }
      )

    }else{
      iziToast.show({
        title: 'ERROR',
        class: 'text-danger',
        position: 'topRight',
        message: 'ingrese un filtro para buscar',
        theme: 'dark'
      });
    }
  }

  reset(){
    this.filter='';
    this.init_data();

  }

  deleteProduct(id:any){
    this.load_btn =true;

    this._productService.delete_product_admin(id,this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor:'#1dc740',
          class: 'text-success',
          position: 'topRight',
          message: 'Se elimino el pructo',
          theme: 'dark'
        });

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').hide();

        this.load_btn=false;


        this.init_data();
        console.log(response)

      }, error=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor:'#1dc740',
          class: 'text-success',
          position: 'topRight',
          message: 'Ocurrio un error en el servidor',
          theme: 'dark'
        });
        console.log(error)
        this.load_btn=false;

      }
    )

  }




}
