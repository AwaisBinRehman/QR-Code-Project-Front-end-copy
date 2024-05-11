import { AuthGuard } from './../auth/guards/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductDetailsQrComponent } from './product-details-qr/product-details-qr.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  {
    path: 'products', // Include ':userId' in the route
    children: [
      {
        path: '',
        redirectTo:'all',
        pathMatch: 'full' // Use 'full' to match the entire path
      },
      { path: 'all', component: ProductDetailsComponent },
      { path: 'details/:id', component: ProductDetailsQrComponent },
      { path: 'update/:productId', component: UpdateProductComponent },
    ],
    canActivate: [AuthGuard],
  },
  { path: 'addproduct', component: CreateProductComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
