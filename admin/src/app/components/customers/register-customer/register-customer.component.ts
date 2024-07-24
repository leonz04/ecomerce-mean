import { Component, NgModule } from '@angular/core';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CustomerService } from '../../../services/customer.service';
import { AdminService } from '../../../services/admin.service';
import { response } from 'express';
import { CommonModule } from '@angular/common';

declare let iziToast:any;


@Component({
  selector: 'app-register-customer',
  standalone: true,
  imports: [SidebarComponent,FormsModule,RouterModule,CommonModule],
  templateUrl: './register-customer.component.html',
  styleUrl: './register-customer.component.css'
})
export class RegisterCustomerComponent {

  public customer:any={
    genre:''
  };
  public token:any;
  public load_btn:boolean=false;

  constructor(
    private _customerService:CustomerService,
    private _adminService:AdminService,
    private _router:Router
  ){
    this.token=this._adminService.getToken();
  }

  register(registerForm:any){
    if(registerForm.valid){
      console.log(this.customer)
      this.load_btn=true;
      this._customerService.resgister_customer_admin(this.customer,this.token).subscribe(
        response=>{

          console.log(response);
          iziToast.show({
            title: 'SUCCESS',
            titleColor:'#1dc740',
            class: 'text-success',
            position: 'topRight',
            message: 'Se registro el nuevo Cliente',
            theme: 'dark'
          });

          this.customer={
            genre:'',
            name:'',
            lastName:'',
            birthDate:'',
            phone:'',
            dni:'',
            email:''
          }
          this.load_btn=false;
          this._router.navigate(['/panel/customers/'])
        },
        error=>{
          console.log(error)
        }
      );

    }else{
      iziToast.show({
        title: 'ERROR',
        class: 'text-danger',
        position: 'topRight',
        message: 'response.message',
        theme: 'dark'
      });
    }

  }

}
