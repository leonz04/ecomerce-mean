import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-inventory-product',
  standalone: true,
  imports: [RouterModule,FormsModule,SidebarComponent],
  templateUrl: './inventory-product.component.html',
  styleUrl: './inventory-product.component.css'
})
export class InventoryProductComponent implements OnInit{

  public id:any;
  public token:any;
  public product:any={};


  constructor(
    private _route:ActivatedRoute,
    private _productService:ProductService
  ){
    this.token=localStorage.getItem('token')
  }

  ngOnInit():void{
    this._route.params.subscribe(
      params=>{
        this.id=params["id"];
        console.log(this.id)
        this._productService.get_product_admin(this.id,this.token).subscribe(
          response=>{
            if(response.data==undefined){
              this.product=undefined

            }else{
              this.product=response.data;
              console.log(this.product)
            }
            console.log(response)

          },
          error=>{
            console.log(error)
          }
        )

      }
    );
  }


}
