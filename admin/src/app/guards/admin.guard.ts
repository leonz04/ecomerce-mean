import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {AdminService} from '../services/admin.service'
import {Router} from "@angular/router"
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate{

  constructor(
    private _adminService:AdminService,
    private _router:Router
  ){


  }

  canActivate():any{
    if(!this._adminService.isAthenticate(['admin'])){
      this._router.navigate(['/login'])
      return false;
  }
  return true;
}



// export const AdminGuard: CanActivateFn = (route, state) => {

//   constructor(){

//   }


//     return false


};
