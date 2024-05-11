import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/share/models/qrmodel';
import { QrserviceService } from 'src/app/share/qrservice.service';
import { ActivatedRoute, Router  } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  productData: Product | undefined;
  productPicture: File | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private product: QrserviceService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.paramMap.get('productId');
    if (productId) {
      this.product.getProductById(productId).subscribe(
        (response: any) => {
          console.warn(response);
          this.productData = response.qr;
        },
        (error: any) => {
          console.error('Error getting product:', error);
        }
      );
    }
  }

  submit(data: any) {
    debugger
    const updatedProduct: Partial<Product> = {
      product_name: data.product_name,
      Model: data.Model,
      Manufacturer: data.Manufacturer,
      AvgPrice: data.AvgPrice,
      CurrencyUnit: data.CurrencyUnit,
      Feature: data.Feature,
      Description: data.Description,
      productpicture: data.productpicture,
      barcode: this.productData.barcode,
      brand: this.productData.brand,
      number: this.productData.number,
      selectedBarcodeType: this.productData.selectedBarcodeType,
      size: this.productData.size,
      specfication: this.productData.specfication,
      type: this.productData.type,
      qrCode: this.productData.qrCode ?? ""
    };
    

    if (this.productData) {
      const formData = new FormData();
      formData.append('productData', JSON.stringify(updatedProduct));

      if (this.productPicture) {
        formData.append('productPicture', this.productPicture, this.productPicture.name);
      }

      this.product.updateProduct(this.productData._id, formData).subscribe(
        (data: Product) => {
          this.productData = data;
          this.router.navigate(['/products/all']);
        },
        (error: any) => {
          console.error('Error updating product:', error);
        }
      );
      
    }
  }

  cancel(){
    this.productData = null
    this.router.navigate(['/products/all']);
  }

  handleFileInput(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.productPicture = files[0];
    }
  }

}
