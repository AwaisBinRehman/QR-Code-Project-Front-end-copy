import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarCodeComponent } from './bar-code/bar-code.component';
import { BarComponent } from './bar/bar.component';
import { GenerateQRCodeComponent } from './generate-qr-code/generate-qr-code.component';
import { PricePlanComponent } from './price-plan/price-plan.component';
import { QrCodeDetailComponent } from './qr-code-detail/qr-code-detail.component';

const routes: Routes = [
  {path: '', children: [
    {path: 'generate-bar-code', component: BarCodeComponent},
    {path: 'generate-QR-code', component: GenerateQRCodeComponent},
    {path: 'generate-QR-code/:QrId', component: GenerateQRCodeComponent},
    {path: 'Qr-Codes', component: QrCodeDetailComponent},
    {path: 'choose-Price-Plan', component: PricePlanComponent},
    {path: 'bar', component: BarComponent},
    {path: 'Create-QR-code', component: GenerateQRCodeComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
