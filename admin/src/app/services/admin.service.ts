//admin.services.ts
import { Injectable } from '@angular/core';
import {GLOBAL} from './GLOBAL'
import {Observable} from 'rxjs'
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url;

  constructor(
    private _http: HttpClient
  ){
    this.url=GLOBAL.url;
   }

   login_admin(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this._http.post(this.url+'login_admin',data,{headers:headers});

   }

   getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      console.error('localStorage is not available');
      return null; // or handle this case as needed
    }
  }

  public isAthenticate(allowRoles:string[]):boolean{

    const token:any= localStorage.getItem('token');
    const helper=new JwtHelperService();
    let decodedToken = helper.decodeToken(token);


    if(!token){
      return false;
    }
    try {


      console.log(decodedToken)

      if(!decodedToken){

        localStorage.removeItem('token');
        return false;
      }

    } catch (error) {
      console.log("no acceso")
      localStorage.removeItem('token');
      return false;

    }

    return allowRoles.includes(decodedToken['role']);


  }
}
