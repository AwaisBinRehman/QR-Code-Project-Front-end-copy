import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IMAGE_URL } from 'src/app/share/constants/urls';
import { QrserviceService } from 'src/app/share/qrservice.service';

@Component({
  selector: 'app-searched-product',
  templateUrl: './searched-product.component.html',
  styleUrls: ['./searched-product.component.css']
})
export class SearchedProductComponent implements OnInit {
  IMAGE_URL = IMAGE_URL
  urlInfo: any;
  product: any;
  snapshotPageNo: any;

  constructor(private router: Router,private route: ActivatedRoute, private productService: QrserviceService) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('id');
    if(productId) {
      this.getProductBySearchId(productId)
    }
  }

  getProductBySearchId(productId: any): void {
    this.productService.getProductBySearchId(productId).subscribe({
      next: (response) => {
        this.product = response.qr;
      },
      error: (error) => {
        console.log(error);
        this.router.navigate(['/'])
      }
    });
  }
}
