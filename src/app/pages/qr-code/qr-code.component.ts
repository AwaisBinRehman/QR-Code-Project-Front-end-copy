
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QrserviceService } from 'src/app/share/qrservice.service';


@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QRCodeComponent implements OnInit {
  products:any[] = [];
  constructor(
    private qrserviceservice:QrserviceService,
    private router: Router,
    ) {}

  ngOnInit(): void {
    this._getProducts();

  }
  private _getProducts() {
    this.qrserviceservice.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

}
