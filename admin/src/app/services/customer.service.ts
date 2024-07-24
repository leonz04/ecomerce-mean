import { Injectable } from '@angular/core';
import {GLOBAL} from './GLOBAL'
import {Observable} from 'rxjs'
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  public url;

  constructor(
    private _http: HttpClient)
    {
    this.url=GLOBAL.url;
   }

  get_customers_filter_admin(type:any, filter:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'content-Type':'application/json','Authorization':token})
    return this._http.get(this.url+'get_customers_filter_admin/'+type+"/"+filter,{headers:headers});

   }

   resgister_customer_admin(data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'content-Type':'application/json','Authorization':token})
    return this._http.post(this.url+'register_customer_admin',data,{headers:headers});

   }
   get_customer_admin(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'content-Type':'application/json','Authorization':token})
    return this._http.get(this.url+'get_customer_admin/'+id,{headers:headers});

   }

   update_customer_admin(id:any,data:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'content-Type':'application/json','Authorization':token})
    return this._http.put(this.url+'update_customer_admin/'+id,data,{headers:headers});

   }

   delete_customer_admin(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'content-Type':'application/json','Authorization':token})
    return this._http.delete(this.url+'delete_customer_admin/'+id,{headers:headers});

   }
}


