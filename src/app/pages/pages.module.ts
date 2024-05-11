import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';
import { BarCodeComponent } from './bar-code/bar-code.component';
import { QRCodeComponent } from './qr-code/qr-code.component';
import { GenerateQRCodeComponent } from './generate-qr-code/generate-qr-code.component';
import { PricePlanComponent } from './price-plan/price-plan.component';
import { BarComponent } from './bar/bar.component';
import { NgxBarcodeModule } from 'ngx-barcode';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { NgxQrcodeStylingModule } from 'ngx-qrcode-styling';
import { QrCodeDetailComponent } from './qr-code-detail/qr-code-detail.component';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { BarcodeScannerComponent } from './barcode-scanner/barcode-scanner.component';



@NgModule({
  declarations: [
    BarCodeComponent,
    QRCodeComponent,
    GenerateQRCodeComponent,
    PricePlanComponent,
    BarComponent,
    QrCodeDetailComponent,
    BarcodeScannerComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgxBarcodeModule,
    ReactiveFormsModule,
    FormsModule,
    NgxBarcode6Module,
    NgxQRCodeModule,
    NgxQrcodeStylingModule
  ]
})
export class PagesModule { }
