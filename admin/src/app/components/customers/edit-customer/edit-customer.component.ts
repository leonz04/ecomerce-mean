import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule,Router } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { CustomerService } from '../../../services/customer.service';
import { AdminService } from '../../../services/admin.service';
import { error } from 'console';
import { CommonModule } from '@angular/common';

declare let iziToast:any;


@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [FormsModule,RouterModule,SidebarComponent,CommonModule],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent implements OnInit {

  public customer:any={};
  public id:any;
  public token:any;
  public load_btn:boolean=false;
  public load_data:boolean=true;


  constructor(
    private _route:ActivatedRoute,
    private _customerService: CustomerService,
    private _adminService: AdminService,
    private _router:Router,
  ){
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {

    this._route.params.subscribe(
      params=>{
        console.log(this.id=params['id'])
        this.id=params['id'];

        this._customerService.get_customer_admin(this.id,this.token).subscribe(
          response=>{
            console.log(response)
            if(response.data==undefined){
              this.customer=undefined
              this.load_data=false;

            }else{
              this.customer=response.data
              // this.load_data=false;
               setTimeout(() => {
                 this.load_data=false;
               }, 3000);
            }


          },
          error=>{
            console.log(error);
          }
        )
        console.log(this.id)
      }
    )

  }



  update(updateForm:any){

    if(updateForm.valid){
      this.load_btn=true;
      this._customerService.update_customer_admin(this.id,this.customer,this.token).subscribe(
        response=>{
          console.log(response)
          iziToast.show({
            title: 'SUCCESS',
            titleColor:'#1dc740',
            class: 'text-success',
            position: 'topRight',
            message: 'Se actualizo correctamente',
            theme: 'dark'
          });
          this.load_btn=false;
          this._router.navigate(['/panel/customers'])



      },error=>{
        console.log(error)
      })

    }else{
      iziToast.show({
        title: 'ERROR',
        class: 'text-danger',
        position: 'topRight',
        message: 'response.message',
        theme: 'dark'
      })

    }

  }

}
