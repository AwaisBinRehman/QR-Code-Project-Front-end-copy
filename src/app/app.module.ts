import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './share/header/header.component';
import { NavigationComponent } from './share/navigation/navigation.component';
import { FooterComponent } from './share/footer/footer.component';
import { ClientHomeComponent } from './client-home/client-home/client-home.component';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
import { QrserviceService } from './share/qrservice.service';
import { ProductModule } from './product/product.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptor } from './auth/auth.interceptor';
import { NgxBarcodeModule } from 'ngx-barcode';
import { UploadbarcodeComponent } from './client-home/uploadbarcode/uploadbarcode.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RecaptchaComponent } from './client-home/recaptcha/recaptcha.component';
// import { RECAPTCHA_SETTINGS  }
import { NgxCaptchaModule } from 'ngx-captcha';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchedProductComponent } from './client-home/searched-product/searched-product.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavigationComponent,
    FooterComponent,
    ClientHomeComponent,
    UploadbarcodeComponent,
    RecaptchaComponent,
    SearchedProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatIconModule, 
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxBarcodeModule,
    NgxQRCodeModule,
    NgxCaptchaModule,
    NgxBarcode6Module,
    PagesModule,
    AuthModule,
    ProductModule,
    BrowserAnimationsModule,
    NgxBarcodeModule,
    ToastrModule.forRoot(),
    NgbModule,
    

  ],

  providers: [QrserviceService,
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
