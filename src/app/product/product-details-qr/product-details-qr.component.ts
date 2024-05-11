import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QrserviceService } from '../../share/qrservice.service';
import { UserService } from 'src/app/services/user.service';
import { IMAGE_URL, QRCODE_URL } from 'src/app/share/constants/urls';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Product } from 'src/app/share/models/qrmodel';

@Component({
  selector: 'app-product-details-qr',
  templateUrl: './product-details-qr.component.html',
  styleUrls: ['./product-details-qr.component.css']
})

export class ProductDetailsQrComponent implements OnInit {
  IMAGE_URL = IMAGE_URL
  QRCODE_URL = QRCODE_URL
  urlInfo: any;
  product: Product;
  snapshotPageNo: any;

  constructor(private activatedRoute: ActivatedRoute, private userSer: UserService, private route: ActivatedRoute, private productService: QrserviceService) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.getProductById(productId);
    }
    this.urlInfo = window.location.origin + 'searched/';
  }


  
  getProductById(productId: any): void {
    this.productService.getProductById(productId).subscribe({
      next: (response) => {
        // console.log(product); // Check the console for the product data
        this.product = response.qr;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }
}
