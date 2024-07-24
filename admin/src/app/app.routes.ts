import { AppComponent } from './app.component';
//app.routes.ts
import { Routes, RouterModule } from '@angular/router';
import {ModuleWithProviders} from '@angular/core'
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

import{AdminGuard} from './guards/admin.guard'
import { IndexCustomerComponent } from './components/customers/index-customer/index-customer.component';
import { RegisterCustomerComponent } from './components/customers/register-customer/register-customer.component';
import { EditCustomerComponent } from './components/customers/edit-customer/edit-customer.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { IndexProductComponent } from './components/products/index-product/index-product.component';
import { UpdateProductComponent } from './components/products/update-product/update-product.component';
import { InventoryProductComponent } from './components/products/inventory-product/inventory-product.component';

const appRoutes: Routes =[
  {path:'',redirectTo:'home',pathMatch:'full'},
  { path: 'home', component: HomeComponent, canActivate:[AdminGuard] },

  { path: 'panel', children:[

    {path:'customers',component:IndexCustomerComponent,canActivate:[AdminGuard]},
    {path:'customers/register',component:RegisterCustomerComponent,canActivate:[AdminGuard]},
    {path:'customers/:id',component:EditCustomerComponent,canActivate:[AdminGuard]},


    {path:'products/register',component:CreateProductComponent,canActivate:[AdminGuard]},
    {path:'products',component:IndexProductComponent,canActivate:[AdminGuard]},
    {path:'products/:id',component:UpdateProductComponent,canActivate:[AdminGuard]},

    {path:'products/inventory/:id',component:InventoryProductComponent,canActivate:[AdminGuard]},





  ] },

  { path: 'login', component: LoginComponent },


]



export const appRoutingProviders :any []=[];
export const routing: ModuleWithProviders<any>=RouterModule.forRoot(appRoutes);
export { appRoutes as routes };
