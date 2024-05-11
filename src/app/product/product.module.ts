import { NgxBarcodeModule } from 'ngx-barcode';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product/create-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductDetailsQrComponent } from './product-details-qr/product-details-qr.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductRoutingModule } from './product-routing.module';
import { CreateBarcodeComponent } from './create-barcode/create-barcode.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';



@NgModule({
  declarations: [
    CreateProductComponent,
    ProductDetailsComponent,
    ProductDetailsQrComponent,
    CreateBarcodeComponent,
    UpdateProductComponent,
    AddProductComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxBarcodeModule,
    NgxQRCodeModule
  ],
  exports: [CreateBarcodeComponent]
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
})
export class ProductModule { }
