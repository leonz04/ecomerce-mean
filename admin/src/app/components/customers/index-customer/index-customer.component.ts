import { CustomerService } from './../../../services/customer.service';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../../services/admin.service';
import { RouterModule } from '@angular/router';

declare let iziToast:any;
declare let jQuery:any;
declare let $:any;


@Component({
  selector: 'app-index-customer',
  standalone: true,
  imports: [SidebarComponent,CommonModule,FormsModule,NgbPaginationModule,RouterModule] ,
  templateUrl: './index-customer.component.html',
  styleUrl: './index-customer.component.css'
})
export class IndexCustomerComponent implements OnInit {

  public customers:Array<any>=[];
  public last_name_filter='';
  public email_filter='';

  public page=1;
  public pageSize=5;
  public collectionSize:any;
  public token:any;
  public load_data:boolean=true;



  constructor(
    private _customerService: CustomerService,
    private _adminService : AdminService
  ){
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    this.init_Data();

  }

  init_Data(){
    this._customerService.get_customers_filter_admin(null,null,this.token).subscribe(
      response=>{
        this.customers=response.data
        this.collectionSize=this.customers.length
        // setTimeout(() => {
        //   this.load_data=false;

        // }, 3000);
        this.load_data=false;
      },
      err=>{
        console.log(err)
      }
    );

  }

  filter(type:any){


    if(type=='lastName'){
      if(this.last_name_filter){
        this.load_data=true;
        this._customerService.get_customers_filter_admin(type,this.last_name_filter,this.token).subscribe(
          response=>{
            this.customers=response.data
            // setTimeout(() => {
            this.load_data=false;
            // },3000)

          },
          err=>{
            console.log(err)
          }
        );

      }else{
        this.init_Data();
      }



    }else if(type='email'){
      if(this.email_filter){
        this.load_data=true;


        this._customerService.get_customers_filter_admin(type,this.email_filter,this.token).subscribe(
          response=>{
            this.customers=response.data
            console.log(this.customers)

          },
          err=>{
            console.log(err)
          }
        );
      }else{
        this.init_Data();
      }
    }
  }

  deleteCustomer(id:any){
    this._customerService.delete_customer_admin(id,this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor:'#1dc740',
          class: 'text-success',
          position: 'topRight',
          message: 'Se elimino el Cliente',
          theme: 'dark'
        });

        $('#delete-'+id).modal('hide');
        $('.modal-backdrop').hide();


        this.init_Data();
        console.log(response)

      }, error=>{
        console.log(error)
      }
    )
  }
}
