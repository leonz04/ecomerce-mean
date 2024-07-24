//logincomponent.ts

import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { title } from 'process';

import { response } from 'express';
import { error } from 'console';
import { AdminService } from '../../services/admin.service'
import { Route, Router } from '@angular/router';

declare let jQuery:any;
declare let $:any;
declare let iziToast:any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit  {

  public user: any = {};
  public token:any='';

  constructor(
    private _adminService:AdminService,
    private _router:Router,
  ) {
    // Constructor
    this.token = this._adminService.getToken();
  }
  ngOnInit(): void {
    console.log('ngOnInit token:', this.token);  // Añadido para verificar el token en ngOnInit
    if(this.token){
      this._router.navigate(['/'])
    }else{
      //mantener componente

    }
  }


  login(loginForm: any) {
    if (loginForm.valid) {
      let data = {
        email: this.user.email,
        password: this.user.password
      }


      this._adminService.login_admin(data).subscribe(
        (response) => {
          if(response.data==undefined){
            iziToast.show({
              title: 'ERROR',
              class: 'text-danger',
              position: 'topRight',
              message: response.message,
              theme: 'dark'
            });
          }else{
            this.user=response.data;
            const localStorage = document.defaultView?.localStorage;

            localStorage?.setItem('token',response.token);
            localStorage?.setItem('_id',response.data._id);
            this._router.navigate(['/'])
          }
          console.log(response);
          // Aquí puedes manejar la respuesta exitosa, por ejemplo, redireccionar o mostrar un mensaje de éxito
        },
        (error) => {
          console.log(error);
          // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        }
      );

    } else {
      iziToast.show({
        title: 'ERROR',
        class: 'text-danger',
        position: 'topRight',
        message: 'Faltan datos',
        theme: 'dark'
      });
    }
  }
}
