import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/share/models/qrmodel';
import { QrserviceService } from '../../share/qrservice.service';
import { DownloadFileService } from './../../services/download-file.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IMAGE_URL, QRCODE_URL } from 'src/app/share/constants/urls';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface barcodeInterface {
  name: string,
  value: "" | "CODE128" | "CODE128A" | "CODE128B" | "CODE128C" | "EAN" | "UPC" | "EAN8" | "EAN5" | "EAN2" | "CODE39" | "ITF14" | "MSI" | "MSI10" | "MSI11" | "MSI1010" | "MSI1110" | "pharmacode" | "codabar",
  example: string
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  IMAGE_URL = IMAGE_URL
  QRCODE_URL = QRCODE_URL
  productpicture!: string;
  optionCode: any;
  products: Product[] = [];
  urlInfo: "http://localhost:4200/searched/";
  displayedProducts: Product[] = [];
  itemsPerPage: number = 10; // Number of items per page

  elementType = 'img';
  value: any;
  description = 'this is description';
  format = 'CODE128';
  lineColor = '#000000';
  width = 0.9;
  height = 70;
  displayValue = true;
  fontOptions = '';
  font = 'monospace';
  textAlign = 'right';
  textPosition = 'bottom';
  textMargin = 2;
  fontSize = 12;
  background = '#ffffff';
  margin = 8;

  constructor(
    private router: Router,
    private productService: QrserviceService,
    private downloadFile: DownloadFileService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (res: any) => {
        this.products = res;
        this.updateDisplayedProducts(1);
      },
      error: (err) => {
        console.log(err);
      },
    });

  }

  saveAsPdf() {
    debugger
    // Select the barcode element by class name
    const myArray = this.optionCode.split('+');
    if (myArray[1]) {
      const barcodeElement = document.getElementById(myArray[0] + myArray[1]);
      html2canvas(barcodeElement).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
    const standardHeight = 40; // Adjust this value as needed

    // Calculate width proportionally based on the aspect ratio
    const scaleFactor = standardHeight / canvas.height;
    const scaledWidth = canvas.width * scaleFactor;

        pdf.addImage(imgData, 'PNG', 0, 0, scaledWidth, standardHeight);
        pdf.save(`barcode_${myArray[1]}.pdf`);
      });
    }
  }

  updateDisplayedProducts(page: number) {
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = this.products.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.updateDisplayedProducts(page);
  }

  downloadCodesAsImg(qrCodeImage: any, nameOfQR: any) {
    const myArray = this.optionCode.split('+');
    let codeType = myArray[0];

    if (codeType === 'barCode') {
      this.saveAsPdf()
    } else if (codeType === 'qrCode') {
      this.downloadFile.saveAsQrCodeImage(qrCodeImage, nameOfQR);
    } else {
      this.downloadFile.saveAsBarCodeImage(qrCodeImage);
    }
  }

  onFileSelect(event: any) {
    this.productpicture = event.target.files[0];
  }
}
