//product.service.ts

import { Injectable } from '@angular/core';
import {GLOBAL} from './GLOBAL'
import {Observable} from 'rxjs'
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public url;

  constructor(
    private _http: HttpClient)
    {
    this.url=GLOBAL.url;
   }

   register_product_admin(data:any,file:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'Authorization':token});

    const fd = new FormData();
    fd.append('title',data.title);
    fd.append('stock',data.stock);
    fd.append('price',data.price);
    fd.append('description',data.description);
    fd.append('content',data.content);
    fd.append('category',data.category);
    fd.append('frontImage',file);


    return this._http.post(this.url+'register_product_admin',fd,{headers:headers});

   }

   get_products_filter_admin(filter:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'content-Type':'application/json','Authorization':token})
    return this._http.get(this.url+'get_products_filter_admin/'+filter,{headers:headers});

   }

   get_product_admin(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'content-Type':'application/json','Authorization':token})
    return this._http.get(this.url+'get_product_admin/'+id,{headers:headers});

   }

   update_product_admin(data:any,id:any,token:any):Observable<any>{
    if(data.frontImage){
      let headers = new HttpHeaders({'Authorization':token});

      const fd = new FormData();
      fd.append('title',data.title);
      fd.append('stock',data.stock);
      fd.append('price',data.price);
      fd.append('description',data.description);
      fd.append('content',data.content);
      fd.append('category',data.category);
      fd.append('frontImage',data.frontImage);


      return this._http.put(this.url+'update_product_admin/'+id,fd,{headers:headers});

    }else{
      let headers = new HttpHeaders({'Content-Type':'application/json','Authorization':token})
      console.log(data)
      return this._http.put(this.url+'update_product_admin/'+id,data,{headers:headers});

    }
   }

   delete_product_admin(id:any,token:any):Observable<any>{
    let headers = new HttpHeaders({'content-Type':'application/json','Authorization':token})
    return this._http.delete(this.url+'delete_product_admin/'+id,{headers:headers});

   }
}
